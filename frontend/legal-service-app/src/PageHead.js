import React from "react"
import {Helmet} from "react-helmet";


const PageHead = ({title, description, robots}) => {
    return (
        <>
            <Helmet>
                <title>{title || "Lawbe | The lawyer's platform"}</title>
                <meta name="description" content={description || "Book lawyers that fit in your schedule. And have meetings in the comfort of your own home."} />
                {robots && <meta name="robots" content={robots} />}
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta charset="UTF-8" />
            </Helmet>
        </>
    );
}

export default PageHead;
