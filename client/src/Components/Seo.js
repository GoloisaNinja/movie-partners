import React from 'react';
import { Helmet } from 'react-helmet';

const Seo = ({ lang, title, description, image, meta = [] }) => {
	return (
		<Helmet
			htmlAttributes={{ lang }}
			title={title}
			titleTemplate={`Movie Partners | ${title}`}
			meta={[
				{
					name: `description`,
					content: description,
				},
				{
					property: `og:title`,
					content: title,
				},
				{
					property: `og:description`,
					content: description,
				},
				{
					property: `og:image`,
					content: image,
				},
				{
					property: `og:url`,
					content: `https://www.wewatch.pw`,
				},
				{
					property: `og:type`,
					content: `website`,
				},
				{
					name: `twitter:card`,
					content: `summary_large_image`,
				},
				{
					name: `twitter:creator`,
					content: `@goloisaninja`,
				},
				{
					name: `twitter:title`,
					content: title,
				},
				{
					name: `twitter:description`,
					content: description,
				},
				{
					name: `twitter:image`,
					content: image,
				},
			].concat(meta)}
		/>
	);
};

export default Seo;
