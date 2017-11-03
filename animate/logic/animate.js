window.addEventListener("load", function() {
  // No idea why I put it into a variable, but hey
  const canvas = new Canvas();
});

class Canvas {
  constructor() {
    // Config
    this.floaties = 5; // per corner
    this.floatyMaxDistance = 25; // percentage
    this.floatyMinSize = 15; // px
    
    // Vars
    this._floatyMain = jSh(".floaties")[0];
    
    // Init
    this.fillFloaties();
    
    // Add intro events
    const introBtn = jSh(".intro")[0];
    let clicked    = false;
    
    introBtn.addEventListener("mouseover", function() {
      document.body.classList.add("intro-hover");
    });
    
    introBtn.addEventListener("mouseout", function() {
      if (!clicked) {
        document.body.classList.remove("intro-hover");
      }
    });
    
    introBtn.addEventListener("click", function() {
      clicked = true;
      document.body.classList.add("stage-enter");
      
      // Focus on email field
      subscribeInput.focus();
    });
    
    // Add text input events
    const subscribeBtn   = jSh("#subscribe-btn");
    const subscribeInput = jSh("#email-fuze");
    
    subscribeInput.addEventListener("input", function() {
      if (/\s*[\da-z\-\.]+@([\da-z\-]+\.)+[\da-z]{2,}\s*/i.test(this.value)) {
        subscribeBtn.classList.remove("disabled");
      } else {
        subscribeBtn.classList.add("disabled");
      }
    });
    
    // Add subscribe events
    subscribeBtn.addEventListener("click", function() {
      // Stop floaty mouse move events
      beforeSubscribe = false;
      
      // Update email span
      jSh("#subscription-value").textContent = subscribeInput.value.trim();
      
      // Show thank you text with animation
      document.body.classList.add("stage-subscribed");
    });
    
    // Add sliding floaties event
    let floatyTimeout      = null;
    let floatyTimeoutCount = 0;
    let beforeSubscribe    = true;
    
    window.addEventListener("mousemove", (e) => {
      clearTimeout(floatyTimeout);
      floatyTimeoutCount++;
      
      if (beforeSubscribe) {
        const floatyFunction = () => {
          floatyTimeoutCount = 0;
          var maxSlide = 25; // px
          
          this._floatyMain.css({
            marginLeft: (-maxSlide + (maxSlide * 2 ) * (e.clientX / innerWidth)) + "px",
            marginTop: (-maxSlide + (maxSlide * 2 ) * (e.clientY / innerHeight)) + "px"
          });
        };
        
        if (floatyTimeoutCount > 3) {
          floatyFunction();
        } else {
          floatyTimeout = setTimeout(floatyFunction, 25);
        }
      }
    });
  }
  
  fillFloaties() {
    const wrapper = this._floatyMain;
    const corners = [
      [0, 0], // Top left
      [0, 1], // Top right
      [1, 0], // Bottom left
      [1, 1]  // Bottom right
    ];
    
    for (const corner of corners) {
      for (let i=0; i<this.floaties; i++) {
        const x    = this.getRandomFloatyCoord(corner[0]); // Percentage
        const y    = this.getRandomFloatyCoord(corner[1]); // Percentage
        const size = this.getFloatySize();
        const rot  = -90 + Math.random() * 180;
        let shape  = null;
        
        switch (Math.floor(Math.random() * 3)) {
          case 0:
            shape = Shapes.triangle();
            break;
          case 1:
            shape = Shapes.circle();
            break;
          case 2:
            shape = Shapes.square();
            break;
        }
        
        // Apply styles
        shape.css({
          left: x + "%",
          top: y + "%",
          transform: `scale(${ size }, ${ size }) rotate(${ rot }deg)`,
          opacity: size / 10
        });
        
        // Add metadata to DOM
        shape.fuzeData = {
          x,
          y,
          size,
          rot
        };
        
        // Append to wrapper
        wrapper.appendChild(shape);
      }
    }
  }
  
  getRandomFloatyCoord(cornerCoord) {
    const dir = -1 + (cornerCoord * 2);
    return ((cornerCoord * 100) - (this.floatyMaxDistance * dir)) + ((Math.random() * this.floatyMaxDistance) * dir);
  }
  
  getFloatySize() {
    const baseSize = 40;
    return (this.floatyMinSize + Math.random() * (baseSize - this.floatyMinSize)) / baseSize;
  }
}

class Shapes {
  static _shape(name, dom) {
    return jSh.d(".floaty.shape-" + name, null, dom || null);
  }
  
  static triangle() {
    return this._shape("triangle", [
      jSh.svg(null, 42, 37, [
        jSh.path(null, "M5.556.265l2.646 4.582 2.646 4.583H.266L2.91 4.847z")
      ])
    ]);
  }
  
  static circle() {
    return this._shape("circle");
  }
  
  static square() {
    return this._shape("square");
  }
}
