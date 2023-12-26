When a page is composed of content from several content nodes, include the `/paths` property that lists the paths to the content. For example, a page contains content from `/content/image`, `/content/video`, and `/var/files/pdfs`. The following configuration enables sticky connections for all content on the page:

```
/stickyConnections {
	/paths {
		"/content/image"
		"/content/video"
		"/var/files/pdfs"
	}
}
```

---

[Source](https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html?lang=en#identifying-a-sticky-connection-folder-stickyconnectionsfor)
