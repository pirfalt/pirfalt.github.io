function main() {
	var shouldBrowserify = document.createElement('P')
	shouldBrowserify.textContent = [
		'Some JS fun, this script should be replaced later. When i have set up my',
		'site build script.'
	].join(' ')

	document.body.appendChild(shouldBrowserify)
}
main()
