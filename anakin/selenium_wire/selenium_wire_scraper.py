import json
import time
import pandas as pd
from seleniumwire.utils import decode
from seleniumwire import webdriver
from webdriver_manager.chrome import ChromeDriverManager

class Loader:
    def load_driver(self):
        options = {'disable_encoding': True}
        # Create a new instance of the Chrome driver
        driver = webdriver.Chrome(ChromeDriverManager().install(),seleniumwire_options=options )

        # call restaturant website 
        driver.get("https://food.grab.com/ph/en/")

        return driver

class LoadMore:
    def click_button(self, driver):
        return driver.find_element_by_css_selector("button.ant-btn").click()

class RequestBody:
    def get_body(self, request):
        response = request.response
        body_byte = decode(response.body, response.headers.get('Content-Encoding', 'identity'))
        body_dict = json.loads(body_byte.decode("utf-8"))
        return body_dict

class Scraper:
    def __init__(self, RequestBody):
        self.request_body = RequestBody()

    # scrap popular restaurants category
    def get_popular_restaurant_latlng(self, popular_restaurants):
        body = self.request_body.get_body(popular_restaurants)
        
        name = []
        lat = []
        lng = []
        
        for i in range(len(body['recommendedMerchantGroups'][0]['recommendedMerchants'])):
            lat.append(body['recommendedMerchantGroups'][0]['recommendedMerchants'][i]['latlng']['latitude'])
            lng.append(body['recommendedMerchantGroups'][0]['recommendedMerchants'][i]['latlng']['longitude'])
            name.append(body['recommendedMerchantGroups'][0]['recommendedMerchants'][i]['address']['name'])
        
        df = pd.DataFrame(list(zip(name, lat, lng)), columns=['Name','latitude','longitude'])
        return df

    # scrap all restaurant 
    def get_restaurant_latlng(self, all_restaurants):
        res_body = self.request_body.get_body(all_restaurants)
        
        name = []
        lat = []
        lng = []
        
        for i in range(len(res_body['searchResult']['searchMerchants'])):
            lat.append(res_body['searchResult']['searchMerchants'][i]['latlng']['latitude'])
            lng.append(res_body['searchResult']['searchMerchants'][i]['latlng']['longitude'])
            name.append(res_body['searchResult']['searchMerchants'][i]['address']['name'])
        
        df = pd.DataFrame(list(zip(name, lat, lng)), columns=['Name','latitude','longitude'])
        return df

def main():
    main_df = pd.DataFrame()

    loader = Loader()

    driver = loader.load_driver()

    print("====", driver)

    # enter area to search restaurants
    input_id = driver.find_element_by_id("location-input").send_keys("pasay")
    
    # click search button to search the restaurant in the given area, as well as load more restaurants
    load_more = LoadMore()
    load_more.click_button(driver)

    # get api response
    all_restaurants = driver.wait_for_request('/foodweb/v2/search')
    popular_restaurants = driver.wait_for_request('https://portal.grab.com/foodweb/v2/recommended/merchants')

    scrap = Scraper(RequestBody)

    # scrap popular restaurants
    main_df = main_df.append(scrap.get_popular_restaurant_latlng(popular_restaurants))

    # scrap all restaurants
    has_more = True
    while has_more == True:
        df = scrap.get_restaurant_latlng(all_restaurants)
        main_df = main_df.append(df)

        time.sleep(10)

        try:
            load_more.click_button(driver)
        except:
            has_more = False


    main_df.reset_index(drop=True)

    # save data
    main_df.to_csv('restaurant_latlng.csv')

    # close driver
    driver.quit()

if __name__ == '__main__':
    main()