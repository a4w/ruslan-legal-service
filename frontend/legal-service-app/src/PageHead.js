import React from "react"
import {Helmet} from "react-helmet";


const PageHead = ({title, description, robots, image}) => {
    const alt_title = "Lawbe | The lawyer's platform";
    const alt_desc = "Book lawyers that fit in your schedule. And have meetings in the comfort of your own home.";
    const alt_img = "";
    return (
        <>
            <Helmet>
                <title>{title || alt_title}</title>
                <meta name="description" content={description || alt_desc} />
                {robots && <meta name="robots" content={robots} />}
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta charset="UTF-8" />

                <meta property="og:title" content={title || alt_title} />
                <meta property="og:description" content={description || alt_desc} />
                <meta property="og:image" content={image || alt_img} />

                <meta name="twitter:title" content={title || alt_title} />
                <meta name="twitter:description" content={description || alt_desc} />
                <meta name="twitter:image" content={image || alt_img} />
                <meta name="twitter:card" content={image || alt_img} />
            </Helmet>
        </>
    );
}

export default PageHead;
