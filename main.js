/* ==========================================================================
   1. TYPING ANIMATION EFFECT (Typed.js)
   ========================================================================== */
var typed = new Typed(".text", {
    strings: [
        "Geospatial Data Analyst",
        "GIS Developer"
    ],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});


/* ==========================================================================
   2. CV MODAL PREVIEW & DOWNLOAD CONTROLS
   ========================================================================== */
const openCvBtn = document.getElementById('openCvModal');
const closeCvBtn = document.getElementById('closeCvModal');
const cvModal = document.getElementById('cvModal');

if (openCvBtn && cvModal) {
    openCvBtn.addEventListener('click', (e) => {
        e.preventDefault();
        cvModal.classList.add('active');
    });
}

if (closeCvBtn && cvModal) {
    closeCvBtn.addEventListener('click', () => {
        cvModal.classList.remove('active');
    });
}


/* ==========================================================================
   3. CERTIFICATE PREVIEW MODAL GALLERY HANDLER
   ========================================================================== */
const certModal = document.getElementById('certModal');
const closeCertBtn = document.getElementById('closeCertModal');
const certModalImg = document.getElementById('certModalImg');
const certModalTitle = document.getElementById('certModalTitle');
const certPrevBtn = document.getElementById('certPrevBtn');
const certNextBtn = document.getElementById('certNextBtn');
const certCounter = document.getElementById('certCounter');

let currentGallery = [];
let currentImageIndex = 0;

function updateGalleryImage() {
    if (currentGallery.length > 0 && certModalImg) {
        certModalImg.src = currentGallery[currentImageIndex];
        
        if (certCounter) {
            certCounter.textContent = `${currentImageIndex + 1} / ${currentGallery.length}`;
            certCounter.style.display = currentGallery.length > 1 ? 'block' : 'none';
        }

        if (certPrevBtn && certNextBtn) {
            const displayState = currentGallery.length > 1 ? 'flex' : 'none';
            certPrevBtn.style.display = displayState;
            certNextBtn.style.display = displayState;
        }
    }
}

document.querySelectorAll('.preview-cert-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetBtn = e.target.closest('.preview-cert-btn');
        if (!targetBtn) return;

        const certTitle = targetBtn.getAttribute('data-cert-title');
        const galleryData = targetBtn.getAttribute('data-cert-gallery');
        const singleSrc = targetBtn.getAttribute('data-cert-src');

        if (galleryData) {
            currentGallery = galleryData.split(',').map(item => item.trim()).filter(Boolean);
        } else if (singleSrc) {
            currentGallery = [singleSrc.trim()];
        } else {
            currentGallery = [];
        }

        currentImageIndex = 0;

        if (certModalTitle) {
            certModalTitle.textContent = certTitle || 'Certificate Preview';
        }

        updateGalleryImage();

        if (certModal) {
            certModal.classList.add('active');
        }
    });
});

if (certPrevBtn) {
    certPrevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentGallery.length > 1) {
            currentImageIndex = (currentImageIndex - 1 + currentGallery.length) % currentGallery.length;
            updateGalleryImage();
        }
    });
}

if (certNextBtn) {
    certNextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentGallery.length > 1) {
            currentImageIndex = (currentImageIndex + 1) % currentGallery.length;
            updateGalleryImage();
        }
    });
}

if (closeCertBtn && certModal) {
    closeCertBtn.addEventListener('click', () => {
        certModal.classList.remove('active');
    });
}

window.addEventListener('click', (e) => {
    if (certModal && e.target === certModal) {
        certModal.classList.remove('active');
    }
});


/* ==========================================================================
   4. DYNAMIC PROJECT CATEGORY FILTER & ASYNC IMAGE LOADER
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    // 4.1 Project Filter Logic
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();

            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const selectedFilter = btn.getAttribute('data-filter').trim();

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category').trim();
                
                if (selectedFilter === 'all' || cardCategory === selectedFilter) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 4.2 Smooth Image Loading & Spinner Transition
    const projectImages = document.querySelectorAll('.project-card .card-img');
    
    projectImages.forEach((img) => {
        // If image is already cached/loaded by browser
        if (img.complete && img.naturalHeight !== 0) {
            img.classList.add('loaded');
        } else {
            // When the image finishes downloading
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
            // If image fails to load, prevent eternal spinning
            img.addEventListener('error', () => {
                img.classList.add('loaded');
            });
        }
    });
});


/* ==========================================================================
   5. NAVBAR ACTIVE SCROLL SPY (With Click Lock Protection)
   ========================================================================== */
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar a');
let isManualScrolling = false;

window.addEventListener('scroll', () => {
    if (isManualScrolling) return;

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 90;
        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});


/* ==========================================================================
   6. PRECISE NAVBAR SCROLL OFFSET (Instant Active Switch + Smooth Page Scroll)
   ========================================================================== */
document.querySelectorAll('.navbar a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');

        if (targetId && targetId.startsWith('#') && targetId.length > 1) {
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();

                navLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');

                isManualScrolling = true;

                const headerHeight = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                setTimeout(() => {
                    isManualScrolling = false;
                }, 800);
            }
        }
    });
});


/* ==========================================================================
   7. WEB3FORMS AJAX SUBMISSION HANDLER
   ========================================================================== */
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const submitBtn = document.getElementById('submitBtn');

if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const accessKeyInput = contactForm.querySelector('input[name="access_key"]');
        const accessKeyValue = accessKeyInput ? accessKeyInput.value.trim() : '';

        if (!accessKeyValue || accessKeyValue === 'YOUR_ACTUAL_ACCESS_KEY_HERE') {
            if (formStatus) {
                formStatus.className = 'form-status error';
                formStatus.style.display = 'block';
                formStatus.textContent = 'Please paste your 36-character Web3Forms Access Key into index.html.';
            }
            return;
        }

        if (submitBtn) {
            submitBtn.innerHTML = "<i class='bx bx-loader-alt bx-spin'></i> Sending...";
            submitBtn.disabled = true;
        }

        if (formStatus) {
            formStatus.style.display = 'none';
        }

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);

        try {
            const formData = new FormData(contactForm);

            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                },
                signal: controller.signal
            });

            clearTimeout(timeoutId);
            const result = await response.json().catch(() => ({}));

            if (response.ok && result.success) {
                if (formStatus) {
                    formStatus.className = 'form-status success';
                    formStatus.textContent = 'Thank you! Your message has been sent successfully.';
                    formStatus.style.display = 'block';
                }
                contactForm.reset();
            } else {
                if (formStatus) {
                    formStatus.className = 'form-status error';
                    formStatus.textContent = result.message || 'Submission failed. Please check your Access Key.';
                    formStatus.style.display = 'block';
                }
            }
        } catch (error) {
            clearTimeout(timeoutId);
            if (formStatus) {
                formStatus.className = 'form-status error';
                formStatus.textContent = error.name === 'AbortError'
                    ? 'Request timed out. Please contact via WhatsApp or Email.'
                    : 'Network error. Please try again later.';
                formStatus.style.display = 'block';
            }
        } finally {
            if (submitBtn) {
                submitBtn.innerHTML = "<i class='bx bx-send'></i> Send Message";
                submitBtn.disabled = false;
            }
        }
    });
}