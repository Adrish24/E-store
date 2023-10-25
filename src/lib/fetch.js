import axios from "axios";

// this function makes api calls
const fetch = async(url) => {
  try {
    const response = await axios.get(url);

    return response.data
  } catch (error) {
    console.log(error.message);
  }
};

export default fetch;
