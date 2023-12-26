The `/query` property is used to filter the request based on the HTTP query.

```
/0001 {
	/type "deny"
	/method "POST"
	/url "/etc/*"
}
/0002 {
	/type "allow"
	/method "GET"
	/url "/etc/*"
	/query "a=*"
}
```

If a rule contains a `/query`, it only matches requests that contain a query string and match the provided query pattern.

In above example, if requests to `/etc` that have no query string should be allowed as well, the following rules would be required:

```
/0001 {
	/type "deny"
	/method "*"
	/url "/path/*"
}

/0002 {
	/type "allow"
	/method "GET"
	/url "/path/*"
}

/0003 {
	/type "deny"
	/method "GET"
	/url "/path/*"
	/query "*"
}

/0004 {
	/type "allow"
	/method "GET"
	/url "/path/*"
	/query "a=*"
}
```

For more information, see [Sling Cheatsheet](https://experienceleague.adobe.com/docs/experience-manager-cloud-service/content/implementing/developing/full-stack/sling-cheatsheet.html).

---

[Source](https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html?lang=en#configuring-access-to-content-filter)
