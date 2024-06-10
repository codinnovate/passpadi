import React from 'react';
import {Helmet} from "react-helmet";


const Seo = ({title, blogId, banner, author, Tag, des, }) => {
    return (
    <Helmet>
    <title>{title}</title>
    <meta name="description" content={des} />
    <meta charset="utf-8" />
    <link rel="canonical" href={`https://www.passpadi.com/blog/${blogId}`} />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="application-name" content="Passpadi.com" />
    <meta property="og:site_name" content="Passpadi" />
    <meta property="og:title" content={title} />
    <meta property="og:url" href={`https://www.passpadi.com/blog/${blogId}`} />
    <meta property="og:description" content={des} />
    <meta property="og:image" content={banner} />
    <meta property="og:image:secure_url" content={banner} />
    <meta property="og:image:height" content="675" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:type" content="article" />
    <meta property="article:author" content={author} />
    <meta property="article:section" content='education, Jamb, Post UTME' />
    <meta property="og:article:tag" content='Jamb' />
    <meta property="og:article:tag" content='passpadi' />
    <meta name="twitter:site" content="@passpadi" />
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:creator" content="@passpadi" />
    <meta property="twitter:title" content={title} />
    <meta property="twitter:description" content={des} />
    <meta property="twitter:image" content={banner} />
    <meta name="robots" content="max-image-preview:large" />
</Helmet>
    )
}

export default Seo
