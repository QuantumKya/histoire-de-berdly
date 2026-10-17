import { error } from '@sveltejs/kit';
import data from '#lib/assets/data.json';
import nums from '#lib/assets/nums.json';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
    const itemKey = params.chap as keyof typeof data;

    if (!itemKey.toString().startsWith('chapter')) throw error(404, "Missing that page");

    const chapNum = Number(itemKey.split('chapter')[1]);
    if (Number.isNaN(chapNum) || chapNum < 0) throw error(404, "Missing that page");

    
    if (chapNum > nums['chaptersOut']) { // show the peek page
        throw error(466, "sneaky");
    }

    const item = data[itemKey];

    const lines = await fetch('/chapter_text/' + item.content)
        .then(tfile => tfile.text())
        .then(text => text.split('\n'));

    return { item, lines };
};

export const prerender = true;

export function entries() {
    return Object.keys(data).map((chap) => ({ chap }));
}