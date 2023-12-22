The `/mode` property specifies what file permissions are applied to new directories and files in the cache. This setting is restricted by the umask of the calling process. It is an octal number constructed from the sum of one or more of the following values:


| Octal Number | Description                                     |
|--------------|-------------------------------------------------|
| `0400`       | Allow read by owner.                            |
| `0200`       | Allow write by owner.                           |
| `0100`       | Allow the owner to search in directories.       |
| `0040`       | Allow read by group members.                    |
| `0020`       | Allow write by group members.                   |
| `0010`       | Allow group members to search in the directory. |
| `0004`       | Allow read by others.                           |
| `0002`       | Allow write by others.                          |
| `0001`       | Allow others to search in the directory.        |

The default value is `0755` which allows the owner to read, write, or search. It also allows others to read or search.

---

**Source:**

https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html?lang=en#dispatcher-cache-file-permissions
