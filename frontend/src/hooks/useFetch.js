import { useState } from "react";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://parseapi.back4app.com/parse/classes",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
    "X-Parse-Application-Id": "JZlk1zJsl0Go1oCSz5ibw86OlhpTeN8rGZ7dUZSQ",
    "X-Parse-REST-API-Key": "jpLU4lVq5uo1duP1yKsKcyo9dtMS4RIDPxr4dwRU",
  },
});

const useFetch = (key) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getData = async () => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      // GET request using fetch with set headers
      instance
        .get("/users")
        .then(function (response) {
          setLoading(false);
          resolve(response.data.results);
        })
        .catch(function (error) {
          setLoading(false);
          reject(error);
        });
    });
  };

  const postData = async (user) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      // POST request using fetch with set headers
      instance
        .post("/users", user)
        .then(function (response) {
          resolve(response.data);
          setLoading(false);
        })
        .catch(function (error) {
          reject(error);
          setLoading(false);
        });
    });
  };

  const updateData = async (user) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      //  PUT request using fetch with set headers
      instance
        .put("/users/" + user.objectId, { balance: user.balance })
        .then(function (response) {
          setData(response.data);
          setLoading(false);
          resolve(response.data);
        })
        .catch(function (error) {
          setError(error);
          setLoading(false);
          reject(error);
        });
    });
  };

  return {
    data,
    loading,
    error,
    getData,
    postData,
    updateData,
  };
};

export default useFetch;
