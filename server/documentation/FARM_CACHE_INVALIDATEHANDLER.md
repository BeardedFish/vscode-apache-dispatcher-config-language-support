The `/invalidateHandler` property allows you to define a script which is called for each invalidation request received by Dispatcher.

It is called with the following arguments:
- **Handle**: The content path that is invalidated.
- **Action**: The replication Action (for example, Activate, Deactivate).
- **Action Scope**: The replication Action's Scope (empty, unless a header of `CQ-Action-Scope: ResourceOnly` is sent, see [Invalidating Cached Pages from AEM](https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/page-invalidate.html?lang=en) for details).

This method can be used to cover several different use cases. For example, invalidating other application-specific caches, or to handle cases where the externalized URL of a page, and its place in the docroot, does not match the content path.

Below example script logs each invalidate request to a file.

`/invalidateHandler "/opt/dispatcher/scripts/invalidate.sh"`

## Sample Invalidation Handler Script

```bash
#!/bin/bash
printf "%-15s: %s %s" $1 $2 $3 >> /opt/dispatcher/logs/invalidate.log
```

---

[Source](https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html?lang=en#using-custom-invalidation-scripts)
