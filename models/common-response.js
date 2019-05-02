class CommonResponse {
    constructor(responseCode, responseMessage, data) {
        this.responseCode = responseCode ? responseCode : "01";
        this.responseMessage = responseMessage ? responseMessage : "success";
        this.data = data;
      }
  }

module.exports = CommonResponse