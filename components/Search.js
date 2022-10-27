import icons from '../public/icons.json';
import { useEffect } from "react";
import autoComplete from "@tarekraafat/autocomplete.js";
import { MdScreenSearchDesktop } from 'react-icons/md';
import {useRouter} from 'next/router';
export default function Search() {

    const router = useRouter();

    const handler = () => {
        const topic = document.getElementById('autoComplete').value;
        if (Object.keys(icons).includes(topic)) {
            router.push(`/dev/${topic}`)
            const k = router.asPath.search(/dev/i)
            if (k === 1) setTimeout(()=>{router.reload()},250)
        }
    }


    useEffect(() => {
        const autoCompleteJS = new autoComplete({
            selector: "#autoComplete",
            placeHolder: "Search for Dev...",
            data: {
                src: Object.keys(icons),
                cache: true,
            },
            resultsList: {
                element: (list, data) => {
                    if (!data.results.length) {
                        // Create "No Results" message element
                        const message = document.createElement("div");
                        // Add class to the created element
                        message.setAttribute("class", "no_result");
                        // Add message text content
                        message.innerHTML = `<span>Found No Results for "${data.query}"</span>`;
                        // Append message element to the results list
                        list.prepend(message);
                    }
                },
                noResults: true,
            },
            resultItem: {
                highlight: true
            },
            events: {
                input: {
                    selection: (event) => {
                        const selection = event.detail.selection.value;
                        autoCompleteJS.input.value = selection;
                    }
                },

            }
        });

    }, [])

    return (
        <div className="w3-container w3-center">
            <p>Search</p>
            <input id="autoComplete" type="search" dir="ltr" spellCheck={false} autoCorrect="off" autoComplete="off" autoCapitalize="off" />
            <div className='w3-center w3-padding'>
                <button className='w3-button' title='Search' onClick={handler}><MdScreenSearchDesktop size={24}/></button>
            </div>
        </div>
    )
}