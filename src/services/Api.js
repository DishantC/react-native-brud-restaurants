import React, { useEffect } from "react";
import { Platform } from "react-native";

export default class Api {
  // static baseUrl = "http://54.177.134.149:3000/api/restaurant/";
  // static baseUrl1 = "http://54.177.134.149:3000/api/";
  // static baseUrl = "https://brud-new-1.herokuapp.com/api/restaurant/";
  // static baseUrl1 = "https://brud-new-1.herokuapp.com/api/";
  // static baseUrl = "http://184.72.1.189:3000/api/restaurant/";
  // static baseUrl1 = "http://184.72.1.189:3000/api/";
  static baseUrl = "http://54.177.165.108:3000/api/restaurant/";
  static baseUrl1 = "http://54.177.165.108:3000/api/";
}

export const Registration = async (formdata) => {
  // const token=await AsyncStorage.getItem('Token')

  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Accept", "application/json");
    //   myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(Api.baseUrl + "signup", requestOptions)
      .then((res) => resolve(res.json()))
      .catch((err) => reject(err));
  });
};

export const LoginApi = async (formdata) => {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(Api.baseUrl + "login", requestOptions)
      .then((res) => resolve(res.json()))
      .catch((err) => reject(err));
  });
};

export const VerifyOTPApi = async (raw) => {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(Api.baseUrl + "otp-check", requestOptions)
      .then((result) => resolve(result.json()))
      .catch((error) => reject(error));
  });
};

export const ResendOTPApi = async (raw) => {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(Api.baseUrl + "resend-otp", requestOptions)
      .then((result) => resolve(result.json()))
      .catch((error) => reject(error));
  });
};

export const ResetPasswordApi = async (formdata) => {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(Api.baseUrl + "reset-password", requestOptions)
      .then((res) => resolve(res.json()))
      .catch((err) => reject(err));
  });
};

export const SetupCafeApi = async (formdata) => {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(Api.baseUrl + "setup-cafe", requestOptions)
      .then((res) => resolve(res.json()))
      .catch((err) => reject(err));
  });
};

export const CafeProfileApi = async (formdata) => {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(Api.baseUrl + "cafe-edit", requestOptions)
      .then((res) => resolve(res.json()))
      .catch((err) => reject(err));
  });
};

export const ModifierApi = async (formdata) => {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(Api.baseUrl1 + "modifiers/add", requestOptions)
      .then((res) => resolve(res.json()))
      .catch((err) => reject(err));
  });
};

export const AddItemApi = async (formdata) => {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(Api.baseUrl1 + "items/add", requestOptions)
      .then((res) => resolve(res.json()))
      .catch((err) => reject(err));
  });
};

export const GetItemModifier = async (formdata) => {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(Api.baseUrl1 + "modifiers/item-modifiers", requestOptions)
      .then((res) => resolve(res.json()))
      .catch((err) => reject(err));
  });
};

export const GetModifier = async (formdata) => {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(Api.baseUrl1 + "modifiers/modifiers-edit", requestOptions)
      .then((res) => resolve(res.json()))
      .catch((err) => reject(err));
  });
};

export const UpdateModifier = async (formdata) => {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(Api.baseUrl1 + "modifiers/modifiers-update", requestOptions)
      .then((res) => resolve(res.json()))
      .catch((err) => reject(err));
  });
};

export const DeleteModifier = async (formdata) => {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(Api.baseUrl1 + "modifiers/modifiers-delete", requestOptions)
      .then((res) => resolve(res.json()))
      .catch((err) => reject(err));
  });
};

export const GetItems = async (formdata) => {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(Api.baseUrl1 + "items/edit", requestOptions)
      .then((res) => resolve(res.json()))
      .catch((err) => reject(err));
  });
};

export const UpdateItems = async (formdata) => {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(Api.baseUrl1 + "items/update", requestOptions)
      .then((res) => resolve(res.json()))
      .catch((err) => reject(err));
  });
};

export const UploadImage = async (formdata) => {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "multipart/form-data");
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(Api.baseUrl1 + "user/profile-img", requestOptions)
      .then((res) => resolve(res.json()))
      .catch((err) => reject(err));
  });
};

export const ItemListData = async (formdata) => {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(Api.baseUrl1 + "items/list", requestOptions)
      .then((res) => resolve(res.json()))
      .catch((err) => reject(err));
  });
};

export const TimeData = async (formdata) => {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(Api.baseUrl1 + "restaurant/cafe-timming", requestOptions)
      .then((res) => resolve(res.json()))
      .catch((err) => reject(err));
  });
};

export const searchItems = async (formdata) => {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    await fetch(Api.baseUrl1 + "items/list", requestOptions)
      .then((res) => resolve(res.json()))
      .catch((err) => reject(err));
  });
};

export const orderListApi = async (formdata) => {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    await fetch(Api.baseUrl1 + "restaurant/cafe-orders", requestOptions)
      .then((res) => resolve(res.json()))
      .catch((err) => reject(err));
  });
};

export const orderRequestApi = async (formdata) => {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };
    await fetch(Api.baseUrl1 + "restaurant/order-request", requestOptions)
      .then((res) => resolve(res.json()))
      .catch((err) => reject(err));
  });
};

export const orderEarningApi = async (formdata) => {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    await fetch(Api.baseUrl1 + "restaurant/cafe-earning", requestOptions)
      .then((res) => resolve(res.json()))
      .catch((err) => reject(err));
  });
};

export const orderCategoryApi = async (formdata) => {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    await fetch(Api.baseUrl1 + "category/list", requestOptions)
      .then((res) => resolve(res.json()))
      .catch((err) => reject(err));
  });
};

export const forgotPasswordApi = async (formdata) => {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    await fetch(Api.baseUrl1 + "restaurant/forgot-password", requestOptions)
      .then((res) => resolve(res.json()))
      .catch((err) => reject(err));
  });
};
