// About
var aboutLink = document.querySelector('.nav-icon');
new Animocon(aboutLink, [
  // burst animation
  new mojs.Burst({
    parent: aboutLink,
    duration: 600,
    shape : 'circle',
    fill: 'transparent',
    x: '50%',
    y: '50%',
    childOptions: {
      radius: {6:0},
      type: 'line',
      stroke: 'black',
      strokeWidth: 1
    },
    radius: {20:28},
    degree: 90,
    angle: -45,
    count: 7,
    isRunLess: true,
    easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
  }),
  // icon scale animation
  new mojs.Tween({
    duration : 1000,
    onUpdate: function(progress) {
      var elasticOutProgress = mojs.easing.elastic.out(progress);
      var scale = '';
      if (aboutLink.parentElement.classList.length) {
        scale = ' scale(1.25)'
      }
      aboutLink.style.transform = 'translateY(' + 20*(1-elasticOutProgress) + '%)' + scale;
    }
  })
]);

// Work
var workLink = document.querySelector('nav a[href*="work"] .nav-icon');
var pencil = document.querySelector('#work-pencil');
var wrench = document.querySelector('#work-wrench');
new Animocon(workLink, [
  // rotate pencil
  new mojs.Tween({
    duration : 1200,
    easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
    onUpdate: function(progress) {
      var scale = '';
      if (workLink.parentElement.classList.length) {
        scale = ' scale(1.25)'
      }
      pencil.style.transform = 'rotate(' + progress + 'turn)' + scale;
    }
  }),
  // rotate wrench
  new mojs.Tween({
    duration : 800,
    easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
    onUpdate: function(progress) {
      var scale = '';
      if (workLink.parentElement.classList.length) {
        scale = ' scale(1.25)'
      }
      wrench.style.transform = 'rotate(' + -progress + 'turn)' + scale;
    }
  })
]);

// References
var referencesLink = document.querySelector('nav a[href*="references"] .nav-icon');
new Animocon(referencesLink, [
  new mojs.Tween({
    duration : 1200,
    easing: mojs.easing.ease.out,
    onUpdate: function(progress) {
      var elasticOutProgress = mojs.easing.elastic.out(progress);
      if (referencesLink.parentElement.classList.length) {
        elasticOutProgress += 0.25;
      }
      referencesLink.style.transform = 'scale(' + elasticOutProgress + ')';
    }
  })
]);

// Resume
var resumeLink = document.querySelector('nav a[href*="resume"] .nav-icon');
new Animocon(resumeLink, [
  // burst animation
  new mojs.Burst({
    parent: resumeLink,
    duration: 800,
    shape : 'circle',
    fill : 'transparent',
    x: '50%',
    y: '50%',
    childOptions: {
      radius: {16:0},
      type: 'line',
      stroke: 'black',
      strokeWidth: 1
    },
    radius: {20:28},
    count: 10,
    isRunLess: true,
    easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
  }),
  new mojs.Tween({
    duration : 800,
    easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
    onUpdate: function(progress) {
      if (resumeLink.parentElement.classList.length) {
        progress += 0.25;
      }
      resumeLink.style.transform = 'scale(' + progress + ')';
    }
  })
]);

// Contact
var contactLink = document.querySelector('nav a[href*="contact"] .nav-icon');
new Animocon(contactLink, [
  new mojs.Burst({
    parent: contactLink,
    duration: 600,
    delay: 150,
    shape : 'circle',
    fill: 'transparent',
    x: '50%',
    y: '50%',
    childOptions: {
      radius: {6:0},
      type: 'line',
      stroke: 'black',
      strokeWidth: 1
    },
    radius: {20:28},
    degree: -70,
    angle: -40,
    count: 5,
    isRunLess: true,
    easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
  }),
  // icon scale animation
  new mojs.Tween({
    duration : 1000,
    onUpdate: function(progress) {
      var elasticOutProgress = mojs.easing.elastic.out(progress);
      var scale = '';
      if (contactLink.parentElement.classList.length) {
        scale = ' scale(1.25)'
      }
      contactLink.style.transform = 'translateX(' + 20*(1-elasticOutProgress) + '%)'+ scale;
    }
  })
]);

function Animocon(el, tweens) {
  this.el = el.parentElement;

  this.timeline = new mojs.Timeline();

  for(var i = 0, len = tweens.length; i < len; ++i) {
    this.timeline.add(tweens[i]);
  }

  var self = this;
  this.el.addEventListener('mouseenter', function() {
    self.timeline.start();
  });
}

