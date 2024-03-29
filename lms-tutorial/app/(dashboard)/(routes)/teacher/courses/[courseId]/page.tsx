import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { LayoutDashboard, ListChecks } from "lucide-react";
import { redirect } from "next/navigation";

import { TitleForm } from "./_components/TitleForm";
import { DescriptionForm } from "./_components/DescriptionForm";
import { ImageForm } from "./_components/ImageForm";
import { CategoryForm } from "./_components/CategoryForm";

const CourseIdPage = async ({
  params: { courseId },
}: {
  params: { courseId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const course = await db.course.findUnique({
    where: {
      id: courseId,
    },
  });

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const categoriesOptions = categories.map((category) => {
    return {
      label: category.name,
      value: category.id,
    };
  });

  if (!course) {
    return redirect("/");
  }

  const requiredFields = [course.title, course.description, course.imageUrl];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">Course setup</h1>
          <span className="text-sm text-slate-700">
            Complete all fields {completionText}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl">Customize your course</h2>
          </div>
          <TitleForm initialData={course.title} courseId={course.id} />
          <DescriptionForm
            initialData={course.description}
            courseId={course.id}
          />
          <ImageForm initialData={course.imageUrl} courseId={course.id} />
          <CategoryForm
            initialData={course.categoryId}
            courseId={course.id}
            options={categoriesOptions}
          />
        </div>
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={ListChecks} />
              <h2>Course chapters</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseIdPage;
