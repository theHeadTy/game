import Drag from './drag'
//import * as $ from 'jquery';

/**
 * Creates a modal (window) page.
 * @param  {String} label
 * @param  {Any} name
 * @param  {Number} width
 * @param  {Number} height
 * @return void|{HTMLElement}
 */
export function createModal(label, name, width, height) {

	width = width || 314;
	height = height || 100;

	if (document.getElementById(name)) {
		closeWindow(name);
		return false;
	}

		let modalWindow = document.createElement('div'),
		    w = (window.innerWidth / 2) - (width / 2),
		    widthCalc = (width === 314) ? w + 310 : w;

		$(modalWindow).css({
			width: width+'px',
			height: 'auto',
			minHeight: height+'px',
			position: 'absolute',
			top: '185px',
			left: widthCalc+'px',
			background: '#000',
			border: '1px outset #333'
		}).addClass('drag').attr('id', name);

		/* @todo redo this */
		let contents = `
			<table bgcolor="#333333" id="${name}_handle" style="padding:2px;margin:0px;width:${width}px" cellspacing="0" cellpadding="0">
			  <tr>
			    <td style="text-align:left">${label}</td>
					  <td style="text-align:right">
						  <img id="${name}_close" src="http://outwar.com/images/x.jpg">
						</td>
				</tr>
		  </table>
			<div id="${name}_content"></div>`;

	 modalWindow.innerHTML = contents;

	 let tbody = document.getElementsByTagName('body')[0];

		tbody.appendChild(modalWindow);

		let theHandle = document.getElementById(name+"_handle"),
		    theRoot = document.getElementById(name);

		Drag.init(theHandle, theRoot);

		let content = document.getElementById(name+'_content');

		content.innerHTML = '<div text-align="center">...retrieving data...</div>';

		return content;

}

/**
 * Close modal window
 * @param {Any} name
 * @return void
 */
export function closeWindow(name){
	let modal = document.getElementById(name),
			tbody;
	//oldWin.style.zIndex = -1;
	tbody = document.getElementsByTagName('body')[0];
	tbody.removeChild(modal);
}
