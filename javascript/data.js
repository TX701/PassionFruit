export const homeHTML = (num) => {
    return `<div class="home" id="home${num}">
                <div class="topbar" id="home${num}-topbar">
                <div class="left">
                    <img src="./assets/icons/home.png" alt="Broken Image" />
                    <h1>Home</h1>
                </div>
                <div class="right">
                    <img id="home${num}-exit" src="./assets/icons/close-icon.png" alt="" />
                </div>
                </div>

                <div class="home-content">
                <h1>PassionFruit</h1>
                <div class="information">
                    <div class="menu">
                    <div class="contents"><p>Contents</p></div>
                    <div class="menu-item" id="home${num}-item"><p class="home-menu${num}">>> Home</p></div>
                    <div class="menu-item" id="home${num}-item"><p class="icons-menu${num}">Icons</p></div>
                    <div class="menu-item" id="home${num}-item"><p class="windows-menu${num}">Windows</p></div>
                    </div>
                    <div class="menu-text" id="menu${num}-text">
                    <p>Welcome.</p>
                    <p>Please click the icons on the desktop to explore around.</p>
                    <p>You can click on the menu to the left to learn more about each icon.</p>
                    </div>
                </div>
                </div>
                <div class="home-footer">
                    <div class="icon"></div>
                    <p>Show this screen each time the website starts</p>
                </div>
            </div>`;
}

    export const homeText = `<p>Welcome.</p>
                            <p>Please click the icons on the desktop to explore around.</p>
                            <p>You can click on the menu to the left to learn more about each icon.</p>`;

    export const iconsText = `<p>Each icon will open a different window.</p>
                            <p>You will need to double click on an icon to open a new window.</p>
                            <p>You may open multiple of the same window.</p>`;

    export const windowsText = `<p>Windows work how you would expect.</p>
                                <p>Open, close, and move them as you would like.</p>
                                <p>Most windows will also have functions to minimize to the tray or expand to be bigger, these functions will be in the top left of a window.</p>`;


export const imageHTML = (image, num) => {
    return `<div class="image-window" id="${image.file}${num}">
                <div class="topbar" id="${image.file}${num}-topbar">
                <div class="left">
                    <img src="./assets/gallery/${image.file}.${image.ext}" alt="Broken Image" />
                    <h1>${image.file}.${image.ext}</h1>
                </div>
                <div class="right">
                    <img class="tray" id="${image.file}${num}-tray" src="./assets/icons/tray-icon.png" alt="" />
                    <img class="max" id="${image.file}${num}-max" src="./assets/icons/max-icon.png" alt="" />
                    <img class="min" id="${image.file}${num}-min" src="./assets/icons/restoredown-icon.png" alt="" />
                    <img id="${image.file}${num}-exit" src="./assets/icons/close-icon.png" alt="" />
                </div>
                </div>
                <img src="./assets/gallery/${image.file}.${image.ext}" alt="Broken Image" draggable="false">
            </div>`;
}

export const galleryHTML = (num) => {
    return `<div class="gallery" id="gallery${num}">
                <div class="topbar" id="gallery${num}-topbar">
                <div class="left">
                    <img src="./assets/icons/gallery.png" alt="Broken Image" />
                    <h1>Gallery</h1>
                </div>
                <div class="right">
                    <img class="tray" id="gallery${num}-tray" src="./assets/icons/tray-icon.png" alt="" />
                    <img class="max" id="gallery${num}-max" src="./assets/icons/max-icon.png" alt="" />
                    <img class="min" id="gallery${num}-min" src="./assets/icons/restoredown-icon.png" alt="" />
                    <img id="gallery${num}-exit" src="./assets/icons/close-icon.png" alt="" />
                </div>
                </div>

                <div class="options-bar">
                <div class="options-bar-divider"></div>
                <div class="options-bar-elements">
                    <p><span>F</span>ile</p>
                    <p><span>E</span>dit</p>
                    <p><span>V</span>iew</p>
                    <p><span>G</span>o</p>
                    <p>F<span>a</span>vorites</p>
                    <p><span>T</span>ools</p>
                    <p><span>H</span>elp</p>
                </div>
                <div class="options-bar-divider"></div>
                </div>

                <div class="img-gallery">
                <div class="left">
                    <img src="./assets/icons/gallery.png" alt="" />
                    <h1>Gallery</h1>
                    <div class="divider">
                        <div class="red"></div>
                        <div class="yellow"></div>
                        <div class="green"></div>
                        <div class="blue"></div>
                    </div>
                    <div class="img-text">
                    <p>Select an image to view its description</p>
                    <p>Double click to open the picture in its own window</p>
                    </div>
                </div>
                <div class="images"></div>
                </div>

                <div class="gallery-footer">
                    <div class="object-amt"></div>
                    <div class="location">
                        <img src="./assets/icons/home.png" alt="">
                        <p>My Computer</p>
                    </div>
                </div>
            </div>`
}

export const aboutHTML = (num) => {
    return `<div class="about" id="about${num}">
                <div class="topbar" id="about${num}-topbar">
                <div class="left">
                    <img src="./assets/icons/about.png" alt="Broken Image" />
                    <h1>About</h1>
                </div>
                <div class="right">
                    <img class="tray" id="about${num}-tray" src="./assets/icons/tray-icon.png" alt="" />
                    <img class="max" id="about${num}-max" src="./assets/icons/max-icon.png" alt="" />
                    <img class="min" id="about${num}-min" src="./assets/icons/restoredown-icon.png" alt="" />
                    <img id="about${num}-exit" src="./assets/icons/close-icon.png" alt="" />
                </div>
                </div>

                <div class="options-bar">
                    <div class="options-bar-divider"></div>
                    <div class="options-bar-elements">
                    <p><span>F</span>ile</p>
                    <p><span>E</span>dit</p>
                    <p><span>V</span>iew</p>
                    <p><span>G</span>o</p>
                    <p>F<span>a</span>vorites</p>
                    <p><span>T</span>ools</p>
                    <p><span>H</span>elp</p>
                    </div>
                    <div class="options-bar-divider"></div>
                    <div class="search-bar">
                    <h1>A<span>d</span>dress</h1>
                    <div class="bar">
                        <div class="bar-wrapper"> 
                        <img src="./assets/icons/about.png" alt="">
                        <p>https://www.PassionFruit.com/about</p>
                        </div>
                        <button><img src="./assets/icons/arrow-down.png" alt=""></button>
                    </div>
                    <h1>Go</h1>
                    <h1>Links</h1>
                    </div>
                </div>

                <div class="about-container">
                    <div class="about-wrapper">
                        <h1>Name here</h1>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum, magnam! Doloremque harum iure asperiores ea repellat impedit, officiis rem cumque tenetur earum voluptas expedita corporis! Doloremque tenetur ratione ipsa possimus?</p>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut nihil fugit ipsam totam, aspernatur cum veritatis quo in culpa quas provident. Sunt, aperiam? Veritatis consectetur corporis dicta, illum expedita ex. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt optio et cupiditate aliquam accusamus tenetur laudantium, totam quaerat mollitia doloremque ipsam aspernatur nisi tempora facilis voluptatem, a qui consectetur sed!</p>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit tempore quis exercitationem, nam beatae fugiat doloribus deleniti consectetur obcaecati culpa, iusto velit quas accusamus magni quam error repellendus ut rerum!</p>
    
                        <div class="contact">
                        <h2>Contact: </h2>
                        <a href="mailto:">username@gmail.com</a>
                        <p>(123) 456-7890</p>
                        </div>
                    </div>
                <img src="./assets/profile.jpg" alt="" draggable="false"/>
                </div>
            </div>`;
}