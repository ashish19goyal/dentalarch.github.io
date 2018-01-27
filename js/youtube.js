var YouTube = function(options)
{
	var defaults={
		videoId: 'u-LzwEkiJ4Q',
		height: '390',
		width: Math.min(640,$(window).width()-50),
		player: '',
		elementId:'videoplayer'
	};
	var settings = $.extend(defaults, options || {});

	this.addYoutubeLib = function()
	{
		var tag = document.createElement('script');
		tag.src = "https://www.youtube.com/iframe_api";
		var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.append(tag);
	};

	this.youtubeIni = function()
	{
		setTimeout(function()
		{
			if(YT)
			{
				settings.player = new YT.Player(settings.elementId,
				{
					height: settings.height,
					width: settings.width,
					videoId: settings.videoId,
				});
			}
			else{
				this.youtubeIni();
			}
		},1000);
	};

	this.addYoutubeLib();
	this.youtubeIni();
};
