import { URL_REGEX } from "../constants/regex";

export default function(value: string) {
    return URL_REGEX.test(value) || "Please enter a valid URL.";
};
