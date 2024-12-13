"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('resumeForm');
    const resumePage = document.getElementById('resumePage');
    const resumePhoto = document.getElementById('resumePhoto');
    const resumeName = document.getElementById('resumeName');
    const resumeEmail = document.getElementById('resumeEmail');
    const resumePhone = document.getElementById('resumePhone');
    const resumeEducation = document.getElementById('resumeEducation');
    const resumeWorkExperience = document.getElementById('resumeWorkExperience');
    const resumeSkills = document.getElementById('resumeSkills');
    const downloadPdfButton = document.getElementById('download-pdf');
    const backButton = document.getElementById('backButton');
    const editButton = document.getElementById('editButton');
    const resumeContent = document.getElementById('resumeContent');
    const shareLinkButton = document.getElementById('shareLinkButton');
    form.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        event.preventDefault();
        console.log("Form submitted");
        const name1 = document.getElementById("namel").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const degree = document.getElementById("degree").value;
        const education = document.getElementById("education").value;
        const workExperience = document.getElementById("workexperience").value;
        const skills = document.getElementById("skills").value;
        const photoInput = document.getElementById("photo");
        const photofile = photoInput.files ? photoInput.files[0] : null;
        let photoBase64 = '';
        if (photofile) {
            console.log("Photo file detected:", photofile.name);
            photoBase64 = yield fileToBase64(photofile);
            console.log("Photo Base64:", photoBase64);
            localStorage.setItem("resumePhoto", photoBase64);
            resumePhoto.src = photoBase64;
        }
        (_a = document.querySelector(".container")) === null || _a === void 0 ? void 0 : _a.classList.add("hidden");
        resumePage.classList.remove("hidden");
        resumeName.textContent = name1;
        resumeEmail.textContent = `Email: ${email}`;
        resumePhone.textContent = `Phone: ${phone}`;
        resumeEducation.textContent = `${degree} from ${education}`;
        resumeWorkExperience.textContent = workExperience;
        resumeSkills.textContent = skills;
        console.log("Resume updated successfully");
        const queryParams = new URLSearchParams({
            name1: name1,
            email: email,
            phone: phone,
            degree: degree,
            education: education,
            workExperience: workExperience,
            skills: skills
        });
        const uniqueUrl = `${window.location.origin}? ${queryParams.toString()}`;
        shareLinkButton.addEventListener("click", () => {
            navigator.clipboard.writeText(uniqueUrl);
            alert("The link is copied");
        });
        window.history.replaceState(null, '', `${queryParams.toString()}`);
    }));
    function fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }
    editButton.addEventListener("click", () => {
        var _a;
        updateFormFromResume();
        (_a = document.querySelector(".container")) === null || _a === void 0 ? void 0 : _a.classList.remove("hidden");
        resumePage.classList.add("hidden");
    });
    function updateFormFromResume() {
        var _a, _b, _c;
        const [degree, education] = ((_a = resumeEducation.textContent) === null || _a === void 0 ? void 0 : _a.split("form")) || '';
        document.getElementById("namel").value = resumeName.textContent || ' ';
        document.getElementById("email").value = ((_b = resumeEmail.textContent) === null || _b === void 0 ? void 0 : _b.replace('Email:', '')) || '';
        document.getElementById("phone").value = ((_c = resumePhone.textContent) === null || _c === void 0 ? void 0 : _c.replace('Phone:', '')) || '';
        document.getElementById("degree").value = degree || '';
        document.getElementById("education").value = education || '';
        document.getElementById("workexperience").value = resumeWorkExperience.textContent || '';
        document.getElementById("skills").value = resumeSkills.textContent || '';
    }
    downloadPdfButton.addEventListener("click", () => {
        if (typeof html2pdf === undefined) {
            alert('Error: Pdf library is not loaded');
            return;
        }
        const resumeOptions = {
            margin: 0.5,
            filename: 'resume.pdf',
            image: { type: 'jpeg', quality: 1.0 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        html2pdf()
            .from(resumeContent)
            .set(resumeOptions)
            .save()
            .catch((error) => {
            console.error("Pdf Error", error);
        });
    });
    window.addEventListener("DOMContentLoaded", () => {
        const params = new URLSearchParams(window.location.search);
        const name1 = params.get("namel") || '';
        const email = params.get("email") || '';
        const phone = params.get("phone") || '';
        const degree = params.get("degree") || '';
        const education = params.get("education") || '';
        const workExperience = params.get("workexperience") || '';
        const skills = params.get("skills") || '';
        if (name1 || email || phone || degree || education || workExperience || skills) {
            resumeName.textContent = name1;
            resumeEmail.textContent = `Email: ${email}`;
            resumePhone.textContent = `Phone: ${phone}`;
            resumeEducation.textContent = `${degree} from ${education}`;
            resumeWorkExperience.textContent = workExperience;
            resumeSkills.textContent = skills;
            const savePhoto = localStorage.getItem("resumePhoto");
            if (savePhoto) {
                resumePhoto.src = savePhoto;
            }
        }
    });
    resumePhoto.style.width = "150px";
    resumePhoto.style.height = "150px";
    resumePhoto.style.objectFit = "cover";
    resumePhoto.style.borderRadius = "50%";
    resumePhoto.style.display = "block";
    resumePhoto.style.margin = "0 auto";
});
