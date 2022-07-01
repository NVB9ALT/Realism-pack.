//Settings modification
lagReductionInterval = setInterval(function(){
   geofs.api.renderingSettings.degradedCollisions = true
   geofs.api.renderingSettings.lowResRunways = true
}, 100)