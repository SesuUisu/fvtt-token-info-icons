class TokenInfoIcons {
  static async addTokenInfoButtons(app, html, data) {
      let actor = canvas.tokens.get(data._id).actor;
      //let actor = game.actors.get(data.actorId);
      if (actor === undefined) return;

      let ac = 10
      if (game.world.data.system === "pf1") {
          ac = actor.system.attributes.ac.normal.total
      }
      else if (game.world.data.system === "dcc") {
            ac = actor.system.attributes.ac.value
      } 
      else if (game.world.data.system === "dsa-41") {
            ac = actor.system.base.combatAttributes.passive.physicalResistance.value
      } else{
          ac = (isNaN(parseInt(actor.system.attributes.ac.value)) || parseInt(actor.system.attributes.ac.value) === 0) ? 10 : parseInt(actor.system.attributes.ac.value);
      }

      let perceptionTitle = "Passive Perception";
      let perception = 10;
      if (game.world.data.system === "pf1") {
          perception = actor.system.skills.per.mod
          perceptionTitle = "Perception Mod";
      } else if (game.world.data.system === "pf2e") {
          perception = perception + actor.system.attributes.perception.value;
          perceptionTitle = "Perception DC";
      }
      else if (game.world.data.system === "dcc") {
        perception = 0
        perceptionTitle = "Perception DC";
      }
      else if (game.world.data.system === "dsa-41") {
            perceptionTitle = "MR";
            perception = actor.system.base.combatAttributes.passive.magicResistance.value
      } else{
          
          perception = actor.system.skills.prc.passive;
      }

      //console.log("TokenInfoIcons", actor);

      let speed = "";

      if (game.world.data.system === "pf2e") {
          if (actor.data.type === "npc") {
              speed = '<span class="token-info-speed" title="' + game.i18n.localize( "TOKEN_INFO_ICONS.general.speed") + '"><i class="fas fa-walking"></i><span style="font-size: 0.65em;"> ' + actor.system.attributes.speed.value + '</span></span>';
          } else if (actor.data.type === "familiar") {
              // Familiars seem to get either 25 ft. land or water speed
              // It can be modified by other abilities but they will be revising these later so this will likely change
              speed = '<span class="token-info-speed" title="' + game.i18n.localize( "TOKEN_INFO_ICONS.general.speed") + '"><i class="fas fa-walking"></i> 25</span>';
          } else {
              speed = '<span class="token-info-speed" title="' + game.i18n.localize( "TOKEN_INFO_ICONS.general.land") + '"><i class="fas fa-walking"></i> ' + actor.system.attributes.speed.total + '</span>';
          }
      } else if (game.world.data.system === "pf1") {
          speed = '<span class="token-info-speed" title="' + game.i18n.localize( "TOKEN_INFO_ICONS.general.land") + '"><i class="fas fa-walking"></i> ' + actor.system.attributes.speed.land.total + '</span>';
      } else if (game.world.data.system === "dcc") {
          speed = '<span class="token-info-speed" title="' + game.i18n.localize( "TOKEN_INFO_ICONS.general.movement") + '"><i class="fas fa-walking"></i> ' + actor.system.attributes.speed.base + '</span>';
      } else if (game.world.data.system === "dsa-41") {
          speed = '<span class="token-info-speed" title="' + game.i18n.localize( "TOKEN_INFO_ICONS.general.speed") + '"><i class="fas fa-walking"></i> ' + actor.system.base.movement.speed.value + '</span>';
      } else {
          if (actor.system.attributes.movement.walk != 0 && actor.system.attributes.movement.walk != null) speed += '<span class="token-info-speed" title="' + game.i18n.localize( "TOKEN_INFO_ICONS.general.walk") + '"><i class="fas fa-walking"></i> ' + actor.system.attributes.movement.walk + '<span style="font-size: 0.5em;"> ' + actor.system.attributes.movement.units + "</span></span>";
          if (actor.system.attributes.movement.swim != 0 && actor.system.attributes.movement.swim != null) speed += '<span class="token-info-speed" title="' + game.i18n.localize( "TOKEN_INFO_ICONS.general.swim") + '"><i class="fas fa-swimmer"></i> ' + actor.system.attributes.movement.swim + '<span style="font-size: 0.5em;"> ' + actor.system.attributes.movement.units + "</span></span>";
          if (actor.system.attributes.movement.fly != 0 && actor.system.attributes.movement.fly != null) speed += '<span class="token-info-speed" title="' + game.i18n.localize( "TOKEN_INFO_ICONS.general.fly") + '"><i class="fas fa-crow"></i> ' + actor.system.attributes.movement.fly + '<span style="font-size: 0.5em;"> ' + actor.system.attributes.movement.units + "</span></span>";
          if (actor.system.attributes.movement.burrow != 0 && actor.system.attributes.movement.burrow != null) speed += '<span class="token-info-speed" title="' + game.i18n.localize( "TOKEN_INFO_ICONS.general.burrow") + '"><i class="fas fa-mountain"></i> ' + actor.system.attributes.movement.burrow + '<span style="font-size: 0.5em;"> ' + actor.system.attributes.movement.units + "</span></span>";
          if (actor.system.attributes.movement.climb != 0 && actor.system.attributes.movement.climb != null) speed += '<span class="token-info-speed" title="' + game.i18n.localize( "TOKEN_INFO_ICONS.general.climb") + '"><i class="fas fa-grip-lines"></i> ' + actor.system.attributes.movement.climb + '<span style="font-size: 0.5em;"> ' + actor.system.attributes.movement.units + "</span></span>";
      }

      // DCC luck

      let luck = null;
      if (game.world.data.system === "dcc") {
        if (actor.data.type === "Player") {
          luck =  actor.system.abilities.lck.value;
        }
      }

      let newdiv = '<div class="token-info-container">';

      let position = game.settings.get('token-info-icons', 'position');

      let defaultButtons = '<div class="control-icon token-info-icon">' + speed + '</div><div class="control-icon token-info-icon" title="' + game.i18n.localize( "TOKEN_INFO_ICONS.general.ac") + ': ' + ac + '"><i class="fas fa-shield-alt"></i> ' + ac + '</div>';
      if (game.world.data.system === "dsa-41"){
          defaultButtons += '<div class="control-icon token-info-icon" title="' + game.i18n.localize( "TOKEN_INFO_ICONS.general.magicResistance") + ': ' + perception + '"><i class="fas fa-hand-sparkles"></i> ' + perception + '</div>'
      } else if (game.world.data.system !== "dcc"){
        defaultButtons += '<div class="control-icon token-info-icon" title="' + game.i18n.localize( "TOKEN_INFO_ICONS.general.passivePerception") + ': ' + perception + '"><i class="fas fa-eye"></i> ' + perception + '</div>'
      } else{
        // dcc specific
        if(luck != null){
          defaultButtons += '<div class="control-icon token-info-icon" title="' + game.i18n.localize( "TOKEN_INFO_ICONS.general.luck") + ': ' + luck + '"><i class="fas fa-star"></i> ' + luck + '</div>'
        }
      } 
      

      let passiveSensesButtons = '';
      if (!['pf2e', 'pf1','dsa-41'].includes(game.world.data.system) && game.settings.get('token-info-icons', 'allPassiveSenses')) {
          const investigation = actor.system.skills.inv.passive;
          const insight = actor.system.skills.ins.passive;
          const stealth = actor.system.skills.ste.passive;

          const passiveInvestigationButton = `<div class="control-icon token-info-icon" title="` + game.i18n.localize( "TOKEN_INFO_ICONS.general.passiveInvestigation") + `: ${investigation}"><i class="fas fa-search"></i> ${investigation}</div>`;
          const passiveInsightButton = `<div class="control-icon token-info-icon" title="` + game.i18n.localize( "TOKEN_INFO_ICONS.general.passiveInsight") + `: ${insight}"><i class="fas fa-lightbulb"></i> ${insight}</div>`;
          const passiveStealthButton = `<div class="control-icon token-info-icon" title="` + game.i18n.localize( "TOKEN_INFO_ICONS.general.passiveStealth") + `: ${stealth}"><i class="fas fa-eye-slash"></i> ${stealth}</div>`;
          passiveSensesButtons = `${passiveInvestigationButton}${passiveInsightButton}${passiveStealthButton}`;
      }

      let buttons = $(`<div class="col token-info-column-${position}">${defaultButtons}${passiveSensesButtons}</div>`);

      html.find('.col.left').wrap(newdiv);
      html.find('.col.left').before(buttons);
  }
}

Hooks.on('ready', () => {
  const gmOnly = game.settings.get('token-info-icons', 'gmOnly');

  if (gmOnly) {
      if (game.user.isGM) {
          Hooks.on('renderTokenHUD', (app, html, data) => {
              TokenInfoIcons.addTokenInfoButtons(app, html, data)
          });
      }
  } else {
      Hooks.on('renderTokenHUD', (app, html, data) => {
          TokenInfoIcons.addTokenInfoButtons(app, html, data)
      });
  }
});

Hooks.once("init", () => {

  game.settings.register('token-info-icons', 'gmOnly', {
      name: game.i18n.localize( "TOKEN_INFO_ICONS.settings.gmonly"),
      hint: game.i18n.localize( "TOKEN_INFO_ICONS.settings.gmonlytext"),
      scope: "world",
      config: true,
      default: true,
      type: Boolean
  });

  game.settings.register('token-info-icons', 'allPassiveSenses', {
      name: game.i18n.localize( "TOKEN_INFO_ICONS.settings.passivesense"),
      hint: game.i18n.localize( "TOKEN_INFO_ICONS.settings.passivesensetext"),
      scope: "world",
      config: true,
      default: false,
      type: Boolean
  });

  game.settings.register('token-info-icons', 'position', {
      name: game.i18n.localize( "TOKEN_INFO_ICONS.settings.position"),
      hint: game.i18n.localize( "TOKEN_INFO_ICONS.settings.positiontext"),
      scope: "world",
      config: true,
      type: String,
      default: "left",
      choices: {
          "left": game.i18n.localize( "TOKEN_INFO_ICONS.settings.left"),
          "right": game.i18n.localize( "TOKEN_INFO_ICONS.settings.right"),
      }
  });
});

console.log("Token Info Icons loaded");
