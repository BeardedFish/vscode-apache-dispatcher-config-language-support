# File Name:       Confirm-NpmVisualStudioCodeVersionsMatch.ps1
# Author:          Darian Benam <darian@darianbenam.com>
# Date Created:    Saturday, July 13, 2024
# Date Updated:    Saturday, July 13, 2024

#Requires -Version 7

param(
	[Parameter(Mandatory = $true)]
	[string] $NpmPackageJsonPath,
	[Parameter(Mandatory = $true)]
	[string] $NpmPackageLockJsonPath
)

$NpmPackageJson = Get-Content -Raw -Path $NpmPackageJsonPath | ConvertFrom-Json -AsHashTable
$NpmPackageLockJson = Get-Content -Raw -Path $NpmPackageLockJsonPath | ConvertFrom-Json -AsHashTable

if ($NpmPackageJson.engines.vscode -ne $NpmPackageJson.devDependencies.'@types/vscode')
{
	Write-Error "Visual Studio Code Versions do not match in '$NpmPackageJsonPath'!"
	exit 1
}

$NpmPackageLockJsonPackageParent = $NpmPackageLockJson.packages.''

if ($NpmPackageLockJsonPackageParent.engines.vscode -ne $NpmPackageLockJsonPackageParent.devDependencies.'@types/vscode')
{
	Write-Error "Visual Studio Code Versions do not match in '$NpmPackageLockJsonPath'!"
	exit 1
}

Write-Output 'Versions Match'
