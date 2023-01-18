import { useState } from "react";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:1337/parse/classes",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
    "X-Parse-Application-Id": "6yTvfeQsqXzIomLJuLJ7t8bn3HnZMvkBhd21wXZs",
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
    setLoading(true);
    // POST request using fetch with set headers
    instance
      .post("/users", user)
      .then(function (response) {
        setData(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        setError(error);
        setLoading(false);
      });
  };

  const updateData = async (user) => {
    setLoading(true);
    instance
      .put("/users/" + user.objectId, { balance: user.balance })
      .then(function (response) {
        setData(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        setError(error);
        setLoading(false);
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
