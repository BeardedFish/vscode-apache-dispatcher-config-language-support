The `/farms` property defines one or more sets of Dispatcher behaviors, where each set is associated with different web sites or URLs. The `/farms` property can include a single farm or multiple farms:
- Use a single farm when you want Dispatcher to handle all of your web pages or web sites in the same way.
Create multiple farms when different areas of your web site or different web sites require different Dispatcher behavior.
- The `/farms` property is a top-level property in the configuration structure. To define a farm, add a child property to the `/farms` property. Use a property name that uniquely identifies the farm within the Dispatcher instance.

The `/farmname` property is multi-valued, and contains other properties that define Dispatcher behavior:
- The URLs of the pages that the farm applies to.
- One or more service URLs (typically a publish instances) to use for rendering documents.
- The statistics to use for load-balancing multiple document renderers.
- Several other behaviors, such as which files to cache and where to cache.
- The value can include any alphanumeric (a-z, 0-9) character. The following example shows the skeleton definition for two farms named `/daycom` and `/docsdaycom`:

```
# Name of dispatcher
/name "day sites"

# Farms section defines a list of farms or sites
/farms {
	/daycom {
		# ...
	}
	/docdaycom {
		# ...
	}
}
```

If you use more than one render farm, the list is evaluated bottom-up. This flow is relevant when defining [Virtual Hosts](https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html?lang=en#identifying-virtual-hosts-virtualhosts) for your websites.

Each farm property can contain the following child properties:

| Property Name          | Description                                                                                                                                                                                                                                                                                                                                                                          |
|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [/homepage](https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html?lang=en#specify-a-default-page-iis-only-homepage)                                | Default homepage (optional, IIS only).                                                                                                                                                   |
| [/clientheaders](https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html?lang=en#specifying-the-http-headers-to-pass-through-clientheaders)          | The headers from the client HTTP request to pass through.                                                                                                                                |
| [/virtualhosts](https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html?lang=en#identifying-virtual-hosts-virtualhosts)                              | The virtual hosts for this farm.                                                                                                                                                         |
| [/sessionmanagement](https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html?lang=en#enabling-secure-sessions-sessionmanagement)                     | Support for session management and authentication.                                                                                                                                       |
| [/renders](https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html?lang=en#defining-page-renderers-renders)                                          | The servers that provide rendered pages (typically publish instances).                                                                                                                   |
| [/filter](https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html?lang=en#configuring-access-to-content-filter)                                      | Defines the URLs to which Dispatcher enables access.                                                                                                                                     |
| [/vanity_urls](https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html?lang=en#enabling-access-to-vanity-urls-vanity-urls)                           | Configures access to vanity URLs.                                                                                                                                                        |
| [/propagateSyndPost](https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html?lang=en#forwarding-syndication-requests-propagatesyndpost)              | Support for the forwarding of syndication requests.                                                                                                                                      |
| [/cache](https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html?lang=en#configuring-the-dispatcher-cache-cache)                                     | Configures caching behavior.                                                                                                                                                             |
| [/statistics](https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html?lang=en#configuring-load-balancing-statistics)                                 | Defining statistic categories for load-balancing calculations.                                                                                                                           |
| [/stickyConnectionsFor](https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html?lang=en#identifying-a-sticky-connection-folder-stickyconnectionsfor) | The folder that contains sticky documents.                                                                                                                                               |
| [/health_check](https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html?lang=en#specifying-a-health-check-page)                                      | The URL to use to determine server availability.                                                                                                                                         |
| [/retryDelay](https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html?lang=en#specifying-the-page-retry-delay)                                       | The delay before retrying a failed connection.                                                                                                                                           |
| [/unavailablePenalty](https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html?lang=en#reflecting-server-unavailability-in-dispatcher-statistics)     | Penalties that affect statistics for load-balancing calculations.                                                                                                                        |
| [/failover](https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html?lang=en#using-the-failover-mechanism)                                            | Resend requests to different renders when the original request fails.                                                                                                                    |
| [/auth_checker](https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/permissions-cache.html?lang=en)                                                                            | For permission-sensitive caching, see [Caching Secured Content](https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/permissions-cache.html?lang=en). |

---

[Source](https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html?lang=en#defining-farms-farms)
