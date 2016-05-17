
/**
 * Tests if webGL CORS video works and if the Safari bug exists
 */

function webGLCORSTest(callback) {
	var canvas = document.createElement('canvas');
	var gl = null;
	for(var i=0; i<4; i++) {
		gl = canvas.getContext(["webgl","experimental-webgl","moz-webgl","webkit-3d"][i])
		if(gl) break;
	};
	if(!gl) return {error: 'No WebGL support', ok: false};
	var video = document.createElement('video');
	video.autoplay = false;
	video.oncanplay = function(){
		try {
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, video);
		} catch(e) {
			callback({error: e, ok: false});
			return;
		};
		callback({error: false, ok: true});
	};
	video.onerror = function() {
		callback({error: video.error, ok: false});
	};
	video.crossOrigin = 'anonymous';
	var video_path = 'http://d8d913s460fub.cloudfront.net/videoserver/',
			video_filename = 'cat-test-video-320x240.mp4';
	if(!video.canPlayType('video/mp4').match(/maybe|probably/i) && video.canPlayType('video/webm').match(/maybe|probably/i)) {
		video_filename = 'cat-test-video-320x240.webm';
	};
	video.src = video_path + video_filename;
	video.setAttribute('playsinline', '');
	video.setAttribute('webkit-playsinline', '');
	video.play();			
};


/**
 * Compressed
 */
function webGLCORSTest(e){for(var t=document.createElement("canvas"),r=null,o=0;4>o&&!(r=t.getContext(["webgl","experimental-webgl","moz-webgl","webkit-3d"][o]));o++);if(!r)return{error:"No WebGL support",ok:!1};var a=document.createElement("video");a.autoplay=!1,a.oncanplay=function(){try{r.texImage2D(r.TEXTURE_2D,0,r.RGB,r.RGB,r.UNSIGNED_BYTE,a)}catch(t){return void e({error:t,ok:!1})}e({error:!1,ok:!0})},a.onerror=function(){e({error:a.error,ok:!1})},a.crossOrigin="anonymous";var n="http://d8d913s460fub.cloudfront.net/videoserver/",i="cat-test-video-320x240.mp4";!a.canPlayType("video/mp4").match(/maybe|probably/i)&&a.canPlayType("video/webm").match(/maybe|probably/i)&&(i="cat-test-video-320x240.webm"),a.src=n+i,a.setAttribute("playsinline",""),a.setAttribute("webkit-playsinline",""),a.play()}
