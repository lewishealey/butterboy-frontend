import client from '../utils/sanity'
import imageUrlBuilder from "@sanity/image-url"

export function urlFor(source) {
    return imageUrlBuilder(client).image(source);
}