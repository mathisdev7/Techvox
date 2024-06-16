import FormCreatePost from "@/components/create/FormCreatePost";
import Section from "@/components/landing/Section";

export default function Create() {
  return (
    <main>
      <div className="flex-1 flex flex-row">
        <div className="h-full w-full flex justify-center flex-row">
          <div className="relative right-24 hidden lg:block">
            <div className="flex justify-center items-center">
              <Section />
            </div>
          </div>
          <div className="flex justify-center items-center relative lg:right-24">
            <FormCreatePost />
          </div>
        </div>
      </div>
    </main>
  );
}
