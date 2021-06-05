import React from 'react';
import { Route } from 'react-router';

export default function WithHtmlTitleRoute(props) {
	const { htmlTitle, ...restProps } = props;
    window.document.title = htmlTitle || "untitled";
	return <Route {...restProps} />;
}
