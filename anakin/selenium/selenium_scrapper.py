import json
import time
import pandas as pd
from webdriver_manager.chrome import ChromeDriverManager
from selenium import webdriver
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities

def load():
    capabilities = DesiredCapabilities.CHROME
    capabilities["goog:loggingPrefs"] = {"performance": "ALL"}
    options = {'disable_encoding': True}
    driver = webdriver.Chrome(ChromeDriverManager().install(), desired_capabilities=capabilities)
    driver.get("https://food.grab.com/ph/en/")
    return driver

def get_request_id(url):
    req_id = 0
    for logs in log:
        log_json = json.loads(logs['message'])
        if log_json['message']['method'] == 'Network.responseReceived':
            if 'frameId' in log_json['message']['params'].keys():
                if log_json['message']['params']['response']['url'].split('?')[0] == url:
                    req_id = log_json['message']['params']['requestId']
                    return req_id

def get_response_body(url):
    req_id = get_request_id(url)
    res_data = driver.execute_cdp_cmd('Network.getResponseBody',{'requestId': req_id})
    res_body = json.loads(res_data['body'])
    return res_body

def get_nearby_restaurant_latlng(url):
    res_body = get_response_body(url)
    name = []
    lat = []
    lng = []
    
    for i in range(len(res_body['searchResult']['searchMerchants'])):
        lat.append(res_body['searchResult']['searchMerchants'][i]['latlng']['latitude'])
        lng.append(res_body['searchResult']['searchMerchants'][i]['latlng']['longitude'])
        name.append(res_body['searchResult']['searchMerchants'][i]['address']['name'])
    
    df = pd.DataFrame(list(zip(name, lat, lng)), columns=['Name','latitude','longitude'])
    return df

def get_popular_restaurant_latlng(url):
    res_body = get_response_body(url)
    name = []
    lat = []
    lng = []
    
    for i in range(len(res_body['recommendedMerchantGroups'][0]['recommendedMerchants'])):
        lat.append(res_body['recommendedMerchantGroups'][0]['recommendedMerchants'][i]['latlng']['latitude'])
        lng.append(res_body['recommendedMerchantGroups'][0]['recommendedMerchants'][i]['latlng']['longitude'])
        name.append(res_body['recommendedMerchantGroups'][0]['recommendedMerchants'][i]['address']['name'])
    
    df = pd.DataFrame(list(zip(name, lat, lng)), columns=['Name','latitude','longitude'])
    return df

driver = load()

main_df = pd.DataFrame()

def load_more(driver):
    driver.find_element_by_css_selector("button.ant-btn").click()
    time.sleep(10)
    log = driver.get_log('performance')
    return log

driver.find_element_by_id("location-input").send_keys("pasay")
log = load_more(driver)
print(len(log))

main_df = main_df.append(get_popular_restaurant_latlng('https://portal.grab.com/foodweb/v2/recommended/merchants'))
main_df.reset_index(drop=True)

has_more = True
while has_more == True:
    df = get_nearby_restaurant_latlng('https://portal.grab.com/foodweb/v2/search')
    print(df.head(10))
    main_df = main_df.append(df)
    
    time.sleep(10)
    try:
        log = load_more(driver)
    except:
        has_more = False

main_df.reset_index(drop=True)
# main_df.to_csv('selenium_restaurant_latlng.csv')

driver.quit()