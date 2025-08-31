// import { PDFDocument, StandardFonts, rgb } from "pdf-lib"
// import { loadInformations } from "@/lib/informations"

// export async function GET() {
//   try {
//     const { profile, skills, exps, edus, projs } = await loadInformations()

//     const pdfDoc = await PDFDocument.create()
//     const page = pdfDoc.addPage([595.28, 841.89])
//     const { height } = page.getSize()
//     const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica)
//     const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
//     let y = height - 40

//     const write = (
//       text: string,
//       font: any,
//       size: number,
//       color: [number, number, number]
//     ) => {
//       page.drawText(text, { x: 48, y, size, font, color: rgb(...color) })
//       y -= size + 4
//     }

//     const fullName =
//       `${profile.firstName ?? ""} ${profile.lastName ?? ""}`.trim() ||
//       "Your Name"
//     write(fullName, fontBold, 20, [0, 0, 0])
//     if (profile.role) write(profile.role, fontRegular, 10, [0.4, 0.4, 0.4])
//     const contacts = [
//       profile.location,
//       profile.phone,
//       profile.email,
//       profile.website,
//       profile.linkedin,
//       profile.github,
//     ]
//       .filter(Boolean)
//       .join("  •  ")
//     if (contacts) write(contacts, fontRegular, 8, [0.4, 0.4, 0.4])

//     if (profile.summary) {
//       y -= 8
//       write("SUMMARY", fontBold, 12, [0, 0, 0])
//       write(profile.summary, fontRegular, 9, [0.2, 0.2, 0.2])
//     }
//     if (skills.length) {
//       y -= 8
//       write("SKILLS", fontBold, 12, [0, 0, 0])
//       skills.forEach((s) => {
//         page.drawText(`${s.group}: `, {
//           x: 48,
//           y,
//           size: 9,
//           font: fontBold,
//           color: rgb(0, 0, 0),
//         })
//         page.drawText(s.items.join(", "), {
//           x: 48 + fontBold.widthOfTextAtSize(`${s.group}: `, 9),
//           y,
//           size: 9,
//           font: fontRegular,
//           color: rgb(0, 0, 0),
//         })
//         y -= 14
//       })
//     }

//     if (exps.length) {
//       y -= 8
//       write("EXPERIENCE", fontBold, 12, [0, 0, 0])
//       exps.forEach((e) => {
//         write(`${e.role} — ${e.company}`, fontBold, 10, [0, 0, 0])
//         write(
//           `${e.start} – ${e.end}${e.location ? "  |  " + e.location : ""}`,
//           fontRegular,
//           8,
//           [0.4, 0.4, 0.4]
//         )
//         ;(e.bullets || []).forEach((b) => {
//           page.drawText("•", {
//             x: 50,
//             y,
//             size: 8,
//             font: fontRegular,
//             color: rgb(0, 0, 0),
//           })
//           page.drawText(b, {
//             x: 60,
//             y,
//             size: 8,
//             font: fontRegular,
//             color: rgb(0, 0, 0),
//           })
//           y -= 12
//         })
//         y -= 6
//       })
//     }

//     if (projs.length) {
//       y -= 8
//       write("PROJECTS", fontBold, 12, [0, 0, 0])
//       projs.forEach((p) => {
//         const title = p.link ? `${p.name} — ${p.link}` : p.name
//         write(title, fontBold, 10, [0, 0, 0])
//         if (p.tech) write(p.tech, fontRegular, 8, [0.4, 0.4, 0.4])
//         ;(p.bullets || []).forEach((b) => {
//           page.drawText("•", {
//             x: 50,
//             y,
//             size: 8,
//             font: fontRegular,
//             color: rgb(0, 0, 0),
//           })
//           page.drawText(b, {
//             x: 60,
//             y,
//             size: 8,
//             font: fontRegular,
//             color: rgb(0, 0, 0),
//           })
//           y -= 12
//         })
//         y -= 6
//       })
//     }

//     if (edus.length) {
//       y -= 8
//       write("EDUCATION", fontBold, 12, [0, 0, 0])
//       edus.forEach((ed) => {
//         write(`${ed.degree} — ${ed.school}`, fontBold, 10, [0, 0, 0])
//         if (ed.notes) write(ed.notes, fontRegular, 8, [0.4, 0.4, 0.4])
//         y -= 6
//       })
//     }

//     const today = new Date()
//     const stamp = `${today.getFullYear()}-${String(
//       today.getMonth() + 1
//     ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`
//     y -= 12
//     page.drawText(`Generated ${stamp} · ATS-friendly`, {
//       x: 48,
//       y,
//       size: 8,
//       font: fontRegular,
//       color: rgb(0.5, 0.5, 0.5),
//     })

//     const pdfBytes = await pdfDoc.save()
//     const filename = `CV_${fullName.replace(/\s+/g, "_")}_${stamp}.pdf`

//     return new Response(Buffer.from(pdfBytes), {
//       status: 200,
//       headers: {
//         "Content-Type": "application/pdf",
//         "Content-Disposition": `inline; filename="${filename}"`,
//         "Cache-Control": "no-store",
//       },
//     })
//   } catch (err: any) {
//     console.error("[informations/pdf:GET]", err)
//     return new Response(
//       JSON.stringify({ error: err.message ?? "Failed to build PDF" }),
//       { status: 500 }
//     )
//   }
// }
