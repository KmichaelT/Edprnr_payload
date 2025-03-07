import { CheckCircle2, Facebook, Home, Instagram, Linkedin, Twitter } from 'lucide-react'

import { Avatar, AvatarImage } from '@/components/ui/avatar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

const ScholarshipDetail = () => {
  return (
    <section className="py-32">
      <div className="container">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                <Home className="h-4 w-4" />
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Scholarships</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Continuing Education Scholarship</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="mt-7 text-3xl font-semibold md:text-5xl">
          Continuing Education Scholarship for Student Moms
        </h1>
        <div className="relative mt-12 grid gap-16 md:grid-cols-2">
          <article className="prose order-2 mx-auto md:order-1">
            {/* <div>
              <img
                src="/placeholder.svg?height=400&width=800"
                alt="Student mother studying with child"
                className="mb-8 mt-0 aspect-video w-full rounded-lg object-cover"
              />
            </div> */}
            <h1>Helping Student Moms Return to Their Academic Journey</h1>
            <p>
              The Continuing Education Scholarship for Student Moms is designed to support students
              who had to pause their education due to childbirth and now wish to return to school.
              We understand the financial and emotional hurdles student moms face, and this
              scholarship aims to ease that burden by providing financial assistance, academic
              resources, and mentorship to help them successfully reintegrate into their studies.
            </p>
            <h2>Eligibility Requirements</h2>
            <ul>
              <li>Must be a student mother who had to withdraw from school due to childbirth.</li>
              <li>
                Currently enrolled or planning to re-enroll in an accredited high school, college,
                or university.
              </li>
              <li>
                Must demonstrate financial need and a strong commitment to completing education.
              </li>
              <li>Open to applicants of all fields of study.</li>
            </ul>
            <h3>Award Amount</h3>
            <p>Varies based on financial need and availability of funds.</p>
            <h3>How to Apply</h3>
            <p>
              Interested applicants must submit an application form, a personal statement, and proof
              of past enrollment and intent to return to school.
            </p>
            <h2>Other Available Scholarships</h2>
            <div>
              <table>
                <thead>
                  <tr>
                    <th>Scholarship Name</th>
                    <th>Focus Area</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Peace Scholarship for Conflict-Affected Students</td>
                    <td>War & Conflict Displacement</td>
                  </tr>
                  <tr className="m-0 border-t p-0 even:bg-muted">
                    <td>Academic Excellence Tutoring Scholarship</td>
                    <td>Tutoring Support</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              Applications are accepted all year round. Don t miss this opportunity to continue your
              education journey with the support you deserve.
            </p>
          </article>
          <div className="order-1 h-fit md:sticky md:top-20 md:order-2">
            <p className="mb-2 text-lg font-semibold">About this Scholarship</p>
            <p className="text-muted-foreground">
              The Continuing Education Scholarship for Student Moms provides comprehensive support
              for mothers who had to interrupt their education due to childbirth. This scholarship
              offers financial assistance, mentorship, and academic resources to help student
              mothers successfully return to their studies and achieve their educational goals.
            </p>
            <Button size="lg" className="mt-6">
              Apply Now
            </Button>
            <Separator className="my-6" />
            <div className="flex gap-3">
              <Avatar className="size-10 rounded-full border">
                <AvatarImage
                  src="/placeholder.svg?height=100&width=100"
                  alt="Scholarship Coordinator"
                />
              </Avatar>
              <div>
                <h2 className="text-sm font-medium">Managed by Sarah Johnson</h2>
                <p className="text-sm text-muted-foreground">Scholarship Coordinator</p>
              </div>
            </div>
            <Separator className="my-6" />
            <p className="mb-4 text-sm font-medium">Scholarship Benefits</p>
            <ul className="flex flex-col gap-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                <p>Financial Assistance</p>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                <p>Academic Resources</p>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                <p>Mentorship Program</p>
              </li>
            </ul>
            <Separator className="my-6" />
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Share this scholarship</p>
              <ul className="flex gap-2">
                <li>
                  <a
                    href="#"
                    className="inline-flex rounded-full border p-2 transition-colors hover:bg-muted"
                  >
                    <Facebook className="h-4 w-4" />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="inline-flex rounded-full border p-2 transition-colors hover:bg-muted"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="inline-flex rounded-full border p-2 transition-colors hover:bg-muted"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="inline-flex rounded-full border p-2 transition-colors hover:bg-muted"
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export { ScholarshipDetail }
