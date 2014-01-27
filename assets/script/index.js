function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function main() {
	var shouldBrowserify = document.createElement('P')
	shouldBrowserify.textContent = [
		'Some JS fun, this script should be replaced later. When i have set up my',
		'site build script.'
	].join(' ')

	insertAfter(document.getElementsByTagName('H1')[0], shouldBrowserify)
}
main()
