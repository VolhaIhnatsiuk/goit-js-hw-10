import axios from "axios";
import {fetchBreeds, addCatInfo} from "./cat-api"

axios.defaults.headers.common["x-api-key"] = "live_pnWdDrUfXQvcd9jZzEtMbuL8DN7q46DVKndy4HH3T6ZA47LhtQdktp9ITo2p21Os";

const selection = document.querySelector(".breed-select")

fetchBreeds()

selection.addEventListener("change", addCatInfo);