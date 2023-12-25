The `auth_checker` section of the `dispatcher.any` file controls the behavior of permission-sensitive caching. The `auth_checker` section includes the following subsections:
- **url**: The value of the `sling.servlet.paths` property of the servlet that performs the security check.
- **filter**: Filters that specify the folders to which permission-sensitive caching is applied. Typically, a `deny` filter is applied to all folders, and `allow` filters are applied to secured folders.
- **headers**: Specifies the HTTP headers that the authorization servlet includes in the response.

When Dispatcher starts, the Dispatcher log file includes the following debug-level message:

`AuthChecker: initialized with URL 'configured_url'.`

The following example `auth_checker` section configures Dispatcher to use the servlet of the previous topic. The filter section causes permission checks to be performed only on secure HTML resources.

```
/auth_checker {
	# Request is sent to this URL with '?uri=<page>' appended
	/url "/bin/permissioncheck"

	# Only the requested pages matching the filter section below are checked, all other pages get delivered unchecked
	/filter {
		/0000 {
			/glob "*"
			/type "deny"
		}
		/0001 {
			/glob "/content/secure/*.html"
			/type "allow"
		}
	}

	# Any header line returned from the auth_checker's HEAD request matching the section below will be returned as well
	/headers {
		/0000 {
			/glob "*"
			/type "deny"
		}
		/0001 {
			/glob "Set-Cookie:*"
			/type "allow"
		}
	}
}
```

---

[Source](https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/permissions-cache.html?lang=en#configure-dispatcher-for-permission-sensitive-caching)
