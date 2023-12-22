The `/virtualhosts` property defines a list of all hostname/URI combinations that Dispatcher accepts for this farm. You can use the asterisk (*) character as a wildcard. Values for the `/virtualhosts` property use the following format:

`[scheme]host[uri][*]`

- **scheme**: (Optional) Either `http://` or `https://`.
- **host**: (Required) The name or IP address of the host computer and the port number if necessary. ([Learn More](https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.23))
- **uri**: (Optional) The path to the resources.

The following example configuration handles requests for the `.com` and `.ch` domains of `myCompany`, and all domains of `mySubDivision`:

```
/virtualhosts {
	"www.myCompany.com"
	"www.myCompany.ch"
	"www.mySubDivison.*"
}
```

The following configuration handles *all* requests:

```
/virtualhosts {
	"*"
}
```

## Resolving the Virtual Host

When Dispatcher receives an `HTTP` or `HTTPS` request, it finds the virtual host value that best-matches the host, uri, and scheme headers of the request. Dispatcher evaluates the values in the `virtualhosts` properties in the following order:
- Dispatcher begins at the lowest farm and progresses upward in the dispatcher.any file.
- For each farm, Dispatcher begins with the topmost value in the `virtualhosts` property and progresses down the list of values.

Dispatcher finds the best-matching virtual host value in the following manner:

- The first-encountered virtual host that matches all three of the `host`, the `scheme`, and the `uri` of the request is used.
- If no `virtualhosts` values have `scheme` and `uri` parts that both match the `scheme` and `uri` of the request, the first-encountered virtual host that matches the `host` of the request is used.
- If no `virtualhosts` values have a host part that matches the host of the request, the topmost virtual host of the topmost farm is used.

Therefore, you should place your default virtual host at the top of the `virtualhosts` property in the topmost farm of your `dispatcher.any` file.

## Example Virtual Host Resolution

The following example represents a snippet from a `dispatcher.any` file that defines two Dispatcher farms, and each farm defines a `virtualhosts` property.

```
/farms {
	/myProducts {
		/virtualhosts {
			"www.mycompany.com/products/*"
		}
		/renders {
			/hostname "server1.myCompany.com"
			/port "80"
		}
	}
	/myCompany {
		/virtualhosts {
			"www.mycompany.com"
		}
		/renders {
			/hostname "server2.myCompany.com"
			/port "80"
		}
	}
}
```

Using this example, the following table shows the virtual hosts that are resolved for the given HTTP requests:

| Request URL                                    | Resolved Virtual Host       |
|------------------------------------------------|-----------------------------|
| https://www.mycompany.com/products/gloves.html | www.mycompany.com/products/ |
| https://www.mycompany.com/about.html           | www.mycompany.com           |

---

**Source:**

https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html?lang=en#identifying-virtual-hosts-virtualhosts
