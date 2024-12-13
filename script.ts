declare const html2pdf:any;
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('resumeForm') as HTMLFormElement;
    const resumePage = document.getElementById('resumePage') as HTMLElement;
    const resumePhoto = document.getElementById('resumePhoto') as HTMLImageElement;
    const resumeName = document.getElementById('resumeName') as HTMLHeadingElement;
    const resumeEmail = document.getElementById('resumeEmail') as HTMLParagraphElement;
    const resumePhone = document.getElementById('resumePhone') as HTMLParagraphElement;
    const resumeEducation = document.getElementById('resumeEducation') as HTMLParagraphElement;
    const resumeWorkExperience = document.getElementById('resumeWorkExperience') as HTMLParagraphElement;
    const resumeSkills = document.getElementById('resumeSkills') as HTMLParagraphElement;
    const downloadPdfButton = document.getElementById('download-pdf') as HTMLButtonElement;
    const backButton = document.getElementById('backButton') as HTMLButtonElement;
    const editButton = document.getElementById('editButton') as HTMLButtonElement;
    const resumeContent = document.getElementById('resumeContent') as HTMLDivElement;
    const shareLinkButton = document.getElementById('shareLinkButton') as HTMLButtonElement;

    form.addEventListener("submit", async (event: Event) => {
        event.preventDefault();
        console.log("Form submitted");

        const name1 = (document.getElementById("namel") as HTMLInputElement).value;
        const email = (document.getElementById("email") as HTMLInputElement).value;
        const phone = (document.getElementById("phone") as HTMLInputElement).value;
        const degree = (document.getElementById("degree") as HTMLInputElement).value;
        const education = (document.getElementById("education") as HTMLInputElement).value;
        const workExperience = (document.getElementById("workexperience") as HTMLTextAreaElement).value;
        const skills = (document.getElementById("skills") as HTMLTextAreaElement).value;
        const photoInput = document.getElementById("photo") as HTMLInputElement;

        const photofile = photoInput.files ? photoInput.files[0] : null;
        let photoBase64 = '';

        if (photofile) {
            console.log("Photo file detected:", photofile.name);
            photoBase64 = await fileToBase64(photofile);
            console.log("Photo Base64:", photoBase64);

            localStorage.setItem("resumePhoto", photoBase64);
            resumePhoto.src = photoBase64;
        }

        document.querySelector(".container")?.classList.add("hidden");
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
        })

        const uniqueUrl = `${window.location.origin}? ${queryParams.toString()}`
        shareLinkButton.addEventListener("click",()=>{
            navigator.clipboard.writeText(uniqueUrl);
            alert("The link is copied")
        })

        window.history.replaceState(null,'',`${queryParams.toString()}`)
        
    });

    function fileToBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onloadend = () => resolve(
                reader.result as string
            );

            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

editButton.addEventListener("click", ()=>{
    updateFormFromResume();

    document.querySelector(".container")?.classList.remove("hidden");
    resumePage.classList.add("hidden")
})

function updateFormFromResume(){

    const[degree,education] = resumeEducation.textContent?.split("form") || '';
    (document.getElementById("namel") as HTMLInputElement).value = resumeName.textContent || ' ';
    (document.getElementById("email") as HTMLInputElement).value = resumeEmail.textContent?.replace('Email:','') || '';
    (document.getElementById("phone") as HTMLInputElement).value = resumePhone.textContent?.replace('Phone:','') || '';
    (document.getElementById("degree") as HTMLInputElement).value = degree || '';
    (document.getElementById("education") as HTMLInputElement).value = education || '';
    (document.getElementById("workexperience") as HTMLTextAreaElement).value = resumeWorkExperience.textContent || '';
    (document.getElementById("skills") as HTMLTextAreaElement).value = resumeSkills.textContent || '';
}

downloadPdfButton.addEventListener("click", ()=>{
    if(typeof html2pdf === undefined){
        alert('Error: Pdf library is not loaded')
        return;
    }

    const resumeOptions = {
        margin:0.5,
        filename: 'resume.pdf',
        image:{type:'jpeg', quality:1.0},
        html2canvas:{scale:2},
        jsPDF:{unit:'in', format:'letter', orientation:'portrait'}
    }

    html2pdf()
       .from(resumeContent)
       .set(resumeOptions)
       .save()
       .catch((error:Error)=>{
        console.error("Pdf Error",error)
       })
})

    window.addEventListener("DOMContentLoaded", ()=>{
        const params = new URLSearchParams(window.location.search);
        const name1 = params.get("namel") || '';
        const email = params.get("email") || '';
        const phone = params.get("phone") || '';
        const degree = params.get("degree") || '';
        const education = params.get("education") || '';
        const workExperience = params.get("workexperience") || '';
        const skills = params.get("skills") || '';

        if(name1 || email || phone || degree || education || workExperience || skills){
            resumeName.textContent = name1;
            resumeEmail.textContent = `Email: ${email}`;
            resumePhone.textContent = `Phone: ${phone}`;
            resumeEducation.textContent = `${degree} from ${education}`;
            resumeWorkExperience.textContent = workExperience;
            resumeSkills.textContent = skills;

            const savePhoto = localStorage.getItem("resumePhoto")

            if(savePhoto){
                resumePhoto.src = savePhoto;
            }

        }

    })

resumePhoto.style.width = "150px";
resumePhoto.style.height = "150px";
resumePhoto.style.objectFit = "cover";
resumePhoto.style.borderRadius = "50%";
resumePhoto.style.display = "block";
resumePhoto.style.margin = "0 auto"
    
});

