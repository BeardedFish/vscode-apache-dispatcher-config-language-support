Specifies whether Dispatcher uses the `getaddrinfo` function (for IPv6) or the `gethostbyname` function (for IPv4) for obtaining the IP address of the render. A value of `0` causes `getaddrinfo` to be used. A value of `1` causes `gethostbyname` to be used. The default value is `0`.

The `getaddrinfo` function returns a list of IP addresses. Dispatcher iterates the list of addresses until it establishes a TCP/IP connection. Therefore, the `ipv4` property is important when the render hostname is associated with multiple IP addresses and the host, in response to the `getaddrinfo` function, returns a list of IP addresses that are always in the same order. In this situation, you should use the `gethostbyname` function so that the IP address that Dispatcher connects with is randomized.

Amazon Elastic Load Balancing (ELB) is such a service that responds to `getaddrinfo` with a potentially same-ordered list of IP addresses.

---

**Source:**

https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html?lang=en#renders-options
