import http from "../utils/httpCommon";

class ApiService {
  // auth
  signUp(data) {
    return http.post(`/${data?.clientType}/new`, data);
  }
  login(data) {
    return http.post(`/${data?.clientType}/login`, data);
  }
  // seller
  createShop(sellerId) {
    return http.post(`/seller/${sellerId}/shop`);
  }
  addBook(data, sellerId) {
    return http.post(`/seller/${sellerId}/book/new`, data);
  }
  getBook(sellerId) {
    return http.get(`/seller/${sellerId}/books`);
  }
  getOrderDetail(sellerId) {
    return http.get(`/seller/${sellerId}/orders`);
  }
  addShopName(data, sellerId) {
    return http.post(`/seller/${sellerId}/shop`, data);
  }
  seller(sellerId) {
    return http.get(`/seller/${sellerId}`);
  }

  // buyer
  getAllSellers() {
    return http.get("/sellers");
  }
  getSellersById(sellerId) {
    return http.get(`/sellers/${sellerId}`);
  }
  getBookBySellerId(sellerId) {
    return http.get(`/sellers/${sellerId}/books`);
  }
  placeOrder(data, buyerId) {
    return http.post(`/buyer/${buyerId}/order`, data);
  }
  getOrder(buyerId) {
    return http.get(`/buyer/${buyerId}/order`);
  }
  buyer(buyerId) {
    return http.get(`/buyer/${buyerId}`);
  }
}

export default new ApiService();
