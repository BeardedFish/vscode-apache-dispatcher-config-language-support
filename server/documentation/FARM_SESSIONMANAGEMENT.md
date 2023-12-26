The `/sessionmanagement` property is used to create a secure session for access to the render farm so that users must log in to access any page in the farm. After logging in, users can access pages in the farm. See [Creating a Closed User Group](https://experienceleague.adobe.com/docs/experience-manager-65/administering/security/cug.html?lang=en#creating-the-user-group-to-be-used) for information about using this feature with CUGs. Also, see the [Dispatcher Security Checklist](https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/getting-started/security-checklist.html?lang=en) before going live.

To use this feature, the `/allowAuthorized` must be set to `0` in the `/cache` section. As detailed in the [Caching When Authentication](https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html?lang=en#caching-when-authentication-is-used) is used section, requests that include authentication information are not cached when you set the `/allowAuthorized` to `0`. If permission-sensitive caching is required, see the [Caching Secured Content](https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/getting-started/security-checklist.html?lang=en) page.

**CAUTION**: If sections of your website use different access requirements, you must define multiple farms.

An example configuration looks as follows:

```
/sessionmanagement {
	/directory "/usr/local/apache/.sessions"
	/encode "md5"
	/header "HTTP:authorization"
	/timeout "800"
}
```

---

[Source](https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html?lang=en#enabling-secure-sessions-sessionmanagement)
