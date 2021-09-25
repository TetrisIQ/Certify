import {init, addMessages, getLocaleFromNavigator, _} from "svelte-i18n";
import {get_store_value} from "svelte/internal";

import en from './en.json';
import de from './de.json';

// @ts-ignore
addMessages('en', en);
addMessages('de', de);

init({
    fallbackLocale: 'en',
    // initialLocale: getLocaleFromNavigator(),
    initialLocale: 'en'
});

export const getTranslation = (key: string)=>{
    return get_store_value(_)(key);
}