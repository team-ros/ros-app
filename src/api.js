import { rosapi } from "ros-sdk-js"

// wir verbinden uns hier mit der ROS API
const api = new rosapi('https://ros-api-v2.herokuapp.com')

// hier exportieren wir die api.js als api funktion für unsere components
export default api
