With Dispatcher version 4.1.6, you can configure the `/always-resolve` property as follows:

- When set to `1`, it resolves the host-name on every request (the Dispatcher never caches any IP address). There may be a slight performance impact due to the additional call required to get the host information for each request.
- If the property is not set, the IP address is cached by default.

Also, this property can be used in case you run into dynamic IP resolution issues, as shown in the following sample:

```
/renders {
	/0001 {
		/hostname "host-name-here"
		/port "4502"
		/ipv4 "1"
		/always-resolve "1"
	}
}
```

---

**Source:**

https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html?lang=en#renders-options
