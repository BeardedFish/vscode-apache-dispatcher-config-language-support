Use the `/health_check` property to specify a URL that is checked when a 500 status code occurs. If this page also returns a 500 status code, the instance is considered to be unavailable and a configurable time penalty (`/unavailablePenalty`) is applied to the render before retrying.

```
/health_check {
	# Page gets contacted when an instance returns a 500
	/url "/health_check.html"
}
```

---

[Source](https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html?lang=en#specifying-a-health-check-page)
