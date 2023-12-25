The `/categories` property is used to define a category for each type of document for which you want to keep statistics for the render selection. To define a category, add the property inside the `/categories` section that has the following format:

```
/name { /glob "pattern" }
```

The category name must be unique to the farm. The pattern is described in the Designing Patterns for glob Properties section.

To determine the category of a URI, Dispatcher compares the URI with each category pattern until a match is found. Dispatcher begins with the first category in the list and continues in order. Therefore, place categories with more specific patterns first.

For example, Dispatcher the default `dispatcher.any` file defines an HTML category and an others category. The HTML category is more specific and so it appears first:

```
/statistics {
	/categories {
		/html { /glob "*.html" }
		/others  { /glob "*" }
	}
}
```

The following example also includes a category for search pages:

```
/statistics {
	/categories {
		/search { /glob "*search.html" }
		/html { /glob "*.html" }
		/others  { /glob "*" }
	}
}
```

---

[Source](https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html?lang=en#defining-statistics-categories)
