"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

interface QA {
  q: string;
  a: string;
}

export const dynamic = "force-dynamic";
export const revalidate = "false";
export const fetchCache = "force-no-store";

export default function TestPage() {
  const searchParams = useSearchParams();
  const [data, setData] = useState<QA[]>([]);
  const [showAns, setShowAns] = useState(false);
  const [index, setIndex] = useState(0);
  const { toast } = useToast();
  function copyToClipboard() {
    try {
      navigator.clipboard.writeText(location.href);
      toast({
        title: "Copied Link Successfully!",
        description: "You can share this url with your friends.",
      });
    } catch (error) {
      toast({
        title: "Couldn't Copy Link",
        description: "There was an error trying to copy the url.",
        variant: "default",
      });
    }
  }

  useEffect(() => {
    if (searchParams.get("data")) {
      setData(JSON.parse(searchParams.get("data") || ""));
      setData((prevState) => prevState.sort(() => Math.random() - 0.5));
    }
  }, []);

  return (
    <main className="flex items-center justify-center mt-8">
      {(searchParams.get("data") === "[]" || !searchParams.get("data")) && (
        <p className="h-[50vh] flex items-center justify-center">
          Add Question Answers Before Testing Yourself
        </p>
      )}
      {data.length > 0 && (
        <div className="flex flex-col items-center justify-center">
          <div className="group h-80 w-80 [perspective:1000px]">
            <div
              className={cn(
                "relative h-full w-full rounded-xl transition-all duration-500 [transform-style:preserve-3d]",
                showAns && "[transform:rotateY(180deg)]"
              )}
            >
              <div className="absolute inset-0">
                <div className="h-full w-full rounded-xl object-cover border-2 border-zinc-800 flex items-center justify-center">
                  <h1
                    className={cn(
                      "font-bold text-zinc-800 text-center mx-4",
                      data[index].q.length > 70 ? "text-xl" : "text-3xl "
                    )}
                  >
                    {data[index].q}
                  </h1>
                </div>
              </div>
              <div className="absolute inset-0 h-full w-full rounded-xl bg-zinc-800 px-12 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                <div className="flex min-h-full flex-col items-center justify-center">
                  <p className="text-lg">{data[index].a}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 mt-8 mb-4">
            <Button
              className="bg-teal-600 hover:bg-teal-700"
              onClick={() => {
                if (index > 0) {
                  setShowAns(false);
                  if (showAns) {
                    setTimeout(() => {
                      setIndex(index - 1);
                    }, 150);
                  } else {
                    setIndex(index - 1);
                  }
                } else {
                  toast({
                    title: "Can't go back",
                    description: "This is the first question.",
                  });
                }
              }}
            >
              &lt;- Back
            </Button>
            <Button
              className="bg-teal-600 hover:bg-teal-700"
              onClick={() => setShowAns(!showAns)}
            >
              Flip
            </Button>
            <Button
              className="bg-teal-600 hover:bg-teal-700"
              onClick={() => {
                if (index < data.length - 1) {
                  setShowAns(false);
                  if (showAns) {
                    setTimeout(() => {
                      setIndex(index + 1);
                    }, 150);
                  } else {
                    setIndex(index + 1);
                  }
                } else {
                  toast({
                    title: "End of questions",
                    description: "No more questions left.",
                  });
                }
              }}
            >
              Next -&gt;
            </Button>
          </div>
          <Button
            className="bg-teal-600 hover:bg-teal-700"
            onClick={copyToClipboard}
          >
            Share This Test
          </Button>
        </div>
      )}
    </main>
  );
}
