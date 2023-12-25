/**
 * @fileoverview    Represents a one-to-one schema of an Apache Dispatcher Config file according to Adobe's
 *                  documentation (https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html).
 * @author          Darian Benam <darian@darianbenam.com>
 */

export enum ApacheDispatcherNamespace {
	Global = "global",
	AvailableFarms = "available_farms",
	Cache = "cache",
	ClientHeaders = "clientheaders",
	EnabledFarms = "enabled_farms",
	Filters = "filters",
	Renders = "renders",
	VirtualHosts = "vhosts"
}

export enum ApacheDispatcherPropertyKind {
	Scoped,
	Value
}

export type ApacheDispatcherPropertyValue = {
	label: string;
	detail?: string;
	documentation?: string;
}

export type ApacheDispatcherSchema =
	| ApacheDispatcherNamespaceSchema
	| ApacheDispatcherPropertySchema;

export type ApacheDispatcherNamespaceSchema = {
	[namespace: string]: ApacheDispatcherSchema
}

export type ApacheDispatcherPropertySchema = {
    kind: ApacheDispatcherPropertyKind;
    documentationFileName?: string;
    autocompletionItems?: ApacheDispatcherPropertyValue[];
    deprecated?: boolean;
    isPlaceholder?: boolean;
    children?: ApacheDispatcherNamespaceSchema;
}

const APACHE_DISPATCHER_RENDERS_SCHEMA: ApacheDispatcherNamespaceSchema = {
	"[^\\s]+": {
		kind: ApacheDispatcherPropertyKind.Scoped,
		isPlaceholder: true,
		children: {
			"/hostname": {
				kind: ApacheDispatcherPropertyKind.Value,
				documentationFileName: "FARM_RENDERS_HOSTNAME.md"
			},
			"/port": {
				kind: ApacheDispatcherPropertyKind.Value,
				documentationFileName: "FARM_RENDERS_PORT.md"
			},
			"/timeout": {
				kind: ApacheDispatcherPropertyKind.Value,
				documentationFileName: "FARM_RENDERS_TIMEOUT.md"
			},
			"/receiveTimeout": {
				kind: ApacheDispatcherPropertyKind.Value,
				documentationFileName: "FARM_RENDERS_RECEIVETIMEOUT.md"
			},
			"/ipv4": {
				kind: ApacheDispatcherPropertyKind.Value,
				documentationFileName: "FARM_RENDERS_IPV4.md",
				autocompletionItems: [
					{
						label: "0",
						detail: "Disable"
					},
					{
						label: "1",
						detail: "Enable"
					}
				]
			},
			"/secure": {
				kind: ApacheDispatcherPropertyKind.Value,
				documentationFileName: "FARM_RENDERS_SECURE.md",
				autocompletionItems: [
					{
						label: "0",
						detail: "Disable"
					},
					{
						label: "1",
						detail: "Enable"
					}
				]
			},
			"/always-resolve": {
				kind: ApacheDispatcherPropertyKind.Value,
				documentationFileName: "FARM_RENDERS_ALWAYSRESOLVE.md",
				autocompletionItems: [
					{
						label: "0",
						detail: "Disable"
					},
					{
						label: "1",
						detail: "Enable"
					}
				]
			}
		}
	}
};

const APACHE_DISPATCHER_FILTER_SCHEMA: ApacheDispatcherNamespaceSchema = {
	"^/[\\d]+$": {
		kind: ApacheDispatcherPropertyKind.Scoped,
		isPlaceholder: true,
		children: {
			"/type": {
				kind: ApacheDispatcherPropertyKind.Value,
				documentationFileName: "FARM_FILTER_TYPE.md",
				autocompletionItems: [
					{
						label: "allow"
					},
					{
						label: "deny"
					}
				]
			},
			"/method": {
				kind: ApacheDispatcherPropertyKind.Value,
				documentationFileName: "FARM_FILTER_METHOD.md",
				autocompletionItems: [
					{
						label: "HEAD"
					},
					{
						label: "GET"
					},
					{
						label: "POST"
					},
					{
						label: "PUT"
					},
					{
						label: "DELETE"
					}
				]
			},
			"/url": {
				kind: ApacheDispatcherPropertyKind.Value,
				documentationFileName: "FARM_FILTER_URL.md"
			},
			"/query": {
				kind: ApacheDispatcherPropertyKind.Value,
				documentationFileName: "FARM_FILTER_QUERY.md"
			},
			"/protocol": {
				kind: ApacheDispatcherPropertyKind.Value,
				documentationFileName: "FARM_FILTER_PROTOCOL.md"
			},
			"/path": {
				kind: ApacheDispatcherPropertyKind.Value,
				documentationFileName: "FARM_FILTER_PATH.md"
			},
			"/selectors": {
				kind: ApacheDispatcherPropertyKind.Value,
				documentationFileName: "FARM_FILTER_SELECTORS.md"
			},
			"/extension": {
				kind: ApacheDispatcherPropertyKind.Value,
				documentationFileName: "FARM_FILTER_EXTENSION.md"
			},
			"/suffix": {
				kind: ApacheDispatcherPropertyKind.Value,
				documentationFileName: "FARM_FILTER_SUFFIX.md"
			},
			"/glob": {
				kind: ApacheDispatcherPropertyKind.Value,
				deprecated: true,
				documentationFileName: "FARM_FILTER_GLOB.md"
			}
		}
	}
};

const APACHE_DISPATCHER_CACHE_RULES_SCHEMA: ApacheDispatcherSchema = {
	"^/[\\d]+$": {
		kind: ApacheDispatcherPropertyKind.Scoped,
		isPlaceholder: true,
		children: {
			"/glob": {
				kind: ApacheDispatcherPropertyKind.Value,
				documentationFileName: "FARM_CACHE_RULES_GLOB.md"
			},
			"/type": {
				kind: ApacheDispatcherPropertyKind.Value,
				documentationFileName: "FARM_CACHE_RULES_TYPE.md",
				autocompletionItems: [
					{
						label: "allow"
					},
					{
						label: "deny"
					}
				]
			}
		}
	}
}

const APACHE_DISPATCHER_CACHE_SCHEMA: ApacheDispatcherNamespaceSchema = {
	"/docroot": {
		kind: ApacheDispatcherPropertyKind.Value,
		documentationFileName: "FARM_CACHE_DOCROOT.md"
	},
	"/statfile": {
		kind: ApacheDispatcherPropertyKind.Value,
		documentationFileName: "FARM_CACHE_STATFILE.md"
	},
	"/serveStaleOnError": {
		kind: ApacheDispatcherPropertyKind.Value,
		documentationFileName: "FARM_CACHE_SERVESTALEONERROR.md",
		autocompletionItems: [
			{
				label: "0",
				detail: "Disable"
			},
			{
				label: "1",
				detail: "Enable"
			}
		]
	},
	"/allowAuthorized": {
		kind: ApacheDispatcherPropertyKind.Value,
		documentationFileName: "FARM_CACHE_ALLOWAUTHORIZED.md",
		autocompletionItems: [
			{
				label: "0",
				detail: "Disable"
			},
			{
				label: "1",
				detail: "Enable"
			}
		]
	},
	"/rules": {
		kind: ApacheDispatcherPropertyKind.Scoped,
		documentationFileName: "FARM_CACHE_RULES.md",
		children: {
			...APACHE_DISPATCHER_CACHE_RULES_SCHEMA
		}
	},
	"/statfileslevel": {
		kind: ApacheDispatcherPropertyKind.Value,
		documentationFileName: "FARM_CACHE_STATFILESLEVEL.md"
	},
	"/invalidate": {
		kind: ApacheDispatcherPropertyKind.Scoped,
		documentationFileName: "FARM_CACHE_INVALIDATE.md",
		children: {
			"^/[\\d]+$": {
				kind: ApacheDispatcherPropertyKind.Scoped,
				isPlaceholder: true,
				children: {
					"/glob": {
						kind: ApacheDispatcherPropertyKind.Value,
						documentationFileName: "FARM_CACHE_INVALIDATE_GLOB.md",
						autocompletionItems: [
							{
								label: "*"
							}
						]
					},
					"/type": {
						kind: ApacheDispatcherPropertyKind.Value,
						documentationFileName: "FARM_CACHE_INVALIDATE_TYPE.md",
						autocompletionItems: [
							{
								label: "allow"
							},
							{
								label: "deny"
							}
						]
					}
				}
			}
		}
	},
	"/invalidateHandler": {
		kind: ApacheDispatcherPropertyKind.Value,
		documentationFileName: "FARM_CACHE_INVALIDATEHANDLER.md"
	},
	"/allowedClients": {
		kind: ApacheDispatcherPropertyKind.Scoped,
		documentationFileName: "FARM_CACHE_ALLOWEDCLIENTS.md",
		children: {
			"^/[\\d]+$": {
				kind: ApacheDispatcherPropertyKind.Scoped,
				isPlaceholder: true,
				children: {
					"/glob": {
						kind: ApacheDispatcherPropertyKind.Value,
						documentationFileName: "FARM_CACHE_ALLOWEDCLIENTS_GLOB.md",
						autocompletionItems: [
							{
								label: "*"
							}
						]
					},
					"/type": {
						kind: ApacheDispatcherPropertyKind.Value,
						documentationFileName: "FARM_CACHE_ALLOWEDCLIENTS_TYPE.md",
						autocompletionItems: [
							{
								label: "allow"
							},
							{
								label: "deny"
							}
						]
					}
				}
			}
		}
	},
	"/ignoreUrlParams": {
		kind: ApacheDispatcherPropertyKind.Scoped,
		documentationFileName: "FARM_CACHE_IGNOREURLPARAMS.md",
		children: {
			"^/[\\d]+$": {
				kind: ApacheDispatcherPropertyKind.Scoped,
				isPlaceholder: true,
				children: {
					"/glob": {
						kind: ApacheDispatcherPropertyKind.Value,
						documentationFileName: "FARM_CACHE_IGNOREURLPARAMS_GLOB.md",
						autocompletionItems: [
							{
								label: "*"
							}
						]
					},
					"/type": {
						kind: ApacheDispatcherPropertyKind.Value,
						documentationFileName: "FARM_CACHE_IGNOREURLPARAMS_TYPE.md"
					}
				}
			}
		}
	},
	"/headers": {
		kind: ApacheDispatcherPropertyKind.Value,
		documentationFileName: "FARM_CACHE_HEADERS.md"
	},
	"/mode": {
		kind: ApacheDispatcherPropertyKind.Value,
		documentationFileName: "FARM_CACHE_MODE.md",
		autocompletionItems: [
			{
				label: "0755",
				documentation: "Allow the owner to read, write, or search. Also allows others to read or search."
			},
			{
				label: "0400",
				documentation: "Allow read by owner."
			},
			{
				label: "0200",
				documentation: "Allow write by owner."
			},
			{
				label: "0100",
				documentation: "Allow the owner to search in directories."
			},
			{
				label: "0040",
				documentation: "Allow read by group members."
			},
			{
				label: "0020",
				documentation: "Allow write by group members."
			},
			{
				label: "0010",
				documentation: "Allow group members to search in the directory."
			},
			{
				label: "0004",
				documentation: "Allow read by others."
			},
			{
				label: "0002",
				documentation: "Allow write by others."
			},
			{
				label: "0001",
				documentation: "Allow others to search in the directory."
			}
		]
	},
	"/gracePeriod": {
		kind: ApacheDispatcherPropertyKind.Value,
		documentationFileName: "FARM_CACHE_GRACEPERIOD.md"
	},
	"/enableTTL": {
		kind: ApacheDispatcherPropertyKind.Value,
		documentationFileName: "FARM_CACHE_ENABLETTL.md",
		autocompletionItems: [
			{
				label: "0",
				detail: "Disable"
			},
			{
				label: "1",
				detail: "Enable"
			}
		]
	}
};

const APACHE_DISPATCHER_FARM_SCHEMA: ApacheDispatcherNamespaceSchema = {
	"[^\\s]+": {
		kind: ApacheDispatcherPropertyKind.Scoped,
		isPlaceholder: true,
		children: {
			"/homepage": {
				kind: ApacheDispatcherPropertyKind.Value,
				deprecated: true,
				documentationFileName: "FARM_HOMEPAGE.md"
			},
			"/clientheaders": {
				kind: ApacheDispatcherPropertyKind.Scoped,
				documentationFileName: "FARM_CLIENTHEADERS.md"
			},
			"/virtualhosts": {
				kind: ApacheDispatcherPropertyKind.Scoped,
				documentationFileName: "FARM_VIRTUALHOSTS.md"
			},
			"/sessionmanagement": {
				kind: ApacheDispatcherPropertyKind.Scoped,
				documentationFileName: "FARM_SESSIONMANAGEMENT.md",
				children: {
					"/directory": {
						kind: ApacheDispatcherPropertyKind.Value,
						documentationFileName: "FARM_SESSIONMANAGEMENT_DIRECTORY.md"
					},
					"/encode": {
						kind: ApacheDispatcherPropertyKind.Value,
						documentationFileName: "FARM_SESSIONMANAGEMENT_ENCODE.md",
						autocompletionItems: [
							{
								label: "md5"
							},
							{
								label: "hex"
							}
						]
					},
					"/header": {
						kind: ApacheDispatcherPropertyKind.Value,
						documentationFileName: "FARM_SESSIONMANAGEMENT_HEADER.md"
					},
					"/timeout": {
						kind: ApacheDispatcherPropertyKind.Value,
						documentationFileName: "FARM_SESSIONMANAGEMENT_TIMEOUT.md"
					}
				}
			},
			"/renders": {
				kind: ApacheDispatcherPropertyKind.Scoped,
				documentationFileName: "FARM_RENDERS.md",
				children: {
					...APACHE_DISPATCHER_RENDERS_SCHEMA
				}
			},
			"/filter": {
				kind: ApacheDispatcherPropertyKind.Scoped,
				documentationFileName: "FARM_FILTER.md",
				children: {
					...APACHE_DISPATCHER_FILTER_SCHEMA
				}
			},
			"/vanity_urls": {
				kind: ApacheDispatcherPropertyKind.Scoped,
				documentationFileName: "FARM_VANITYURLS.md",
				children: {
					"/url": {
						kind: ApacheDispatcherPropertyKind.Value,
						documentationFileName: "FARM_VANITYURLS_URL.md",
						autocompletionItems: [
							{
								label: "/libs/granite/dispatcher/content/vanityUrls.html"
							}
						]
					},
					"/file": {
						kind: ApacheDispatcherPropertyKind.Value,
						documentationFileName: "FARM_VANITYURLS_FILE.md"
					},
					"/delay": {
						kind: ApacheDispatcherPropertyKind.Value,
						documentationFileName: "FARM_VANITYURLS_DELAY.md"
					}
				}
			},
			"/propagateSyndPost": {
				kind: ApacheDispatcherPropertyKind.Value,
				documentationFileName: "FARM_PROPAGATESYNDPOST.md",
				autocompletionItems: [
					{
						label: "0",
						detail: "Disable"
					},
					{
						label: "1",
						detail: "Enable"
					}
				]
			},
			"/cache": {
				kind: ApacheDispatcherPropertyKind.Scoped,
				documentationFileName: "FARM_CACHE.md",
				children: {
					...APACHE_DISPATCHER_CACHE_SCHEMA
				}
			},
			"/statistics": {
				kind: ApacheDispatcherPropertyKind.Scoped,
				documentationFileName: "FARM_STATISTICS.md",
				children: {
					"/categories": {
						kind: ApacheDispatcherPropertyKind.Scoped,
						documentationFileName: "FARM_STATISTICS_CATEGORIES.md",
						children: {
							"[^\\s]+": {
								kind: ApacheDispatcherPropertyKind.Scoped,
								isPlaceholder: true,
								children: {
									"/glob": {
										kind: ApacheDispatcherPropertyKind.Value,
										autocompletionItems: [
											{
												label: "*"
											}
										]
									}
								}
							}
						}
					}
				}
			},
			"/stickyConnectionsFor": {
				kind: ApacheDispatcherPropertyKind.Value,
				documentationFileName: "FARM_STICKYCONNECTIONSFOR.md"
			},
			"/stickyConnections": {
				kind: ApacheDispatcherPropertyKind.Scoped,
				documentationFileName: "FARM_STICKYCONNECTIONS.md",
				children: {
					"/paths": {
						kind: ApacheDispatcherPropertyKind.Scoped,
						documentationFileName: "FARM_STICKYCONNECTIONS_PATHS.md"
					},
					"/httpOnly": {
						kind: ApacheDispatcherPropertyKind.Value,
						documentationFileName: "FARM_STICKYCONNECTIONS_HTTPONLY.md",
						autocompletionItems: [
							{
								label: "0",
								detail: "Disable"
							},
							{
								label: "1",
								detail: "Enable"
							}
						]
					},
					"/secure": {
						kind: ApacheDispatcherPropertyKind.Value,
						documentationFileName: "FARM_STICKYCONNECTIONS_SECURE.md",
						autocompletionItems: [
							{
								label: "0",
								detail: "Disable"
							},
							{
								label: "1",
								detail: "Enable"
							}
						]
					}
				}
			},
			"/health_check": {
				kind: ApacheDispatcherPropertyKind.Scoped,
				documentationFileName: "FARM_HEALTHCHECK.md",
				children: {
					"/url": {
						kind: ApacheDispatcherPropertyKind.Value,
						documentationFileName: "FARM_HEALTHCHECK_URL.md"
					}
				}
			},
			"/retryDelay": {
				kind: ApacheDispatcherPropertyKind.Value,
				documentationFileName: "FARM_RETRYDELAY.md"
			},
			"/unavailablePenalty": {
				kind: ApacheDispatcherPropertyKind.Value,
				documentationFileName: "FARM_UNAVAILABLEPENALTY.md"
			},
			"/failover": {
				kind: ApacheDispatcherPropertyKind.Value,
				documentationFileName: "FARM_FAILOVER.md",
				autocompletionItems: [
					{
						label: "0",
						detail: "Disable"
					},
					{
						label: "1",
						detail: "Enable"
					}
				]
			},
			"/auth_checker": {
				kind: ApacheDispatcherPropertyKind.Scoped,
				documentationFileName: "FARM_AUTHCHECKER.md",
				children: {
					"/url": {
						kind: ApacheDispatcherPropertyKind.Value,
						documentationFileName: "FARM_AUTHCHECKER_URL.md"
					},
					"/filter": {
						kind: ApacheDispatcherPropertyKind.Scoped,
						documentationFileName: "FARM_AUTHCHECKER_FILTER.md",
						children: {
							"^/[\\d]+$": {
								kind: ApacheDispatcherPropertyKind.Scoped,
								isPlaceholder: true,
								children: {
									"/glob": {
										kind: ApacheDispatcherPropertyKind.Value,
										autocompletionItems: [
											{
												label: "*"
											}
										]
									},
									"/type": {
										kind: ApacheDispatcherPropertyKind.Value,
										autocompletionItems: [
											{
												label: "allow"
											},
											{
												label: "deny"
											}
										]
									}
								}
							}
						}
					},
					"/headers": {
						kind: ApacheDispatcherPropertyKind.Scoped,
						documentationFileName: "FARM_AUTHCHECKER_HEADERS.md",
						children: {
							"^/[\\d]+$": {
								kind: ApacheDispatcherPropertyKind.Scoped,
								isPlaceholder: true,
								children: {
									"/glob": {
										kind: ApacheDispatcherPropertyKind.Value,
										autocompletionItems: [
											{
												label: "*"
											}
										]
									},
									"/type": {
										kind: ApacheDispatcherPropertyKind.Value,
										autocompletionItems: [
											{
												label: "allow"
											},
											{
												label: "deny"
											}
										]
									}
								}
							}
						}
					}
				}
			},
			"/info": {
				kind: ApacheDispatcherPropertyKind.Value,
				documentationFileName: "FARM_INFO.md",
				autocompletionItems: [
					{
						label: "0",
						detail: "Disable"
					},
					{
						label: "1",
						detail: "Enable"
					}
				]
			}
		}
	}
};

const APACHE_DISPATCHER_NAMESPACE_SCHEMA: ApacheDispatcherNamespaceSchema = {
	[ApacheDispatcherNamespace.Global]: {
		"/name": {
			kind: ApacheDispatcherPropertyKind.Value,
			documentationFileName: "NAME.md"
		},
		"/ignoreEINTR": {
			kind: ApacheDispatcherPropertyKind.Value,
			documentationFileName: "IGNORE_EINTR.md"
		},
		"/farms": {
			kind: ApacheDispatcherPropertyKind.Scoped,
			documentationFileName: "FARMS.md",
			children: {
				...APACHE_DISPATCHER_FARM_SCHEMA
			}
		}
	},
	[ApacheDispatcherNamespace.AvailableFarms]: {
		...APACHE_DISPATCHER_FARM_SCHEMA
	},
	[ApacheDispatcherNamespace.Cache]: {
		...APACHE_DISPATCHER_CACHE_RULES_SCHEMA
	},
	[ApacheDispatcherNamespace.ClientHeaders]: {},
	[ApacheDispatcherNamespace.EnabledFarms]: {
		...APACHE_DISPATCHER_FARM_SCHEMA
	},
	[ApacheDispatcherNamespace.Filters]: {
		...APACHE_DISPATCHER_FILTER_SCHEMA
	},
	[ApacheDispatcherNamespace.Renders]: {
		...APACHE_DISPATCHER_RENDERS_SCHEMA
	},
	[ApacheDispatcherNamespace.VirtualHosts]: {}
};


export function getCurrentSchema(
	namespace: ApacheDispatcherNamespace,
	pathToCurrentProperty: string[]
): ApacheDispatcherSchema | undefined {
	let schema: ApacheDispatcherSchema = APACHE_DISPATCHER_NAMESPACE_SCHEMA[namespace];

	while (pathToCurrentProperty.length > 0) {
		const currentScopeSchemaDefinitions: string[] = Object.keys(schema);
		const currentPropertyNamespace: string = pathToCurrentProperty.pop()!;

		let foundMatch: boolean = false;

		for (const definition of currentScopeSchemaDefinitions) {
			const regex: RegExp = new RegExp(definition);

			if (regex.test(currentPropertyNamespace)) {
				const matchedSchema: ApacheDispatcherPropertySchema = (schema as ApacheDispatcherNamespaceSchema)[definition] as ApacheDispatcherPropertySchema;

				if (!("children" in matchedSchema)) {
					return undefined;
				}

				schema = matchedSchema.children!;
				foundMatch = true;

				break;
			}
		}

		if (!foundMatch) {
			break;
		}
	}

	return schema;
}
