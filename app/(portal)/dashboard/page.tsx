import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function DashboardPage() {
  return (
    <div className="flex min-h-dvh p-4">
      <div className="flex max-w-md flex-col gap-4 leading-loose">
        <Card className="min-w-dvw rounded-l">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>
              Weekly snapshots. No more manual exports.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="min-w-dvw">
          <CardHeader>
            <CardTitle>Result</CardTitle>
            <CardDescription>
              Weekly snapshots. No more manual exports.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="min-w-dvw">
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>
              Weekly snapshots. No more manual exports.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="min-w-dvw">
          <CardHeader>
            <CardTitle>Payments</CardTitle>
            <CardDescription>
              Weekly snapshots. No more manual exports.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="min-w-dvw">
          <CardHeader>
            <CardTitle>Payments</CardTitle>
            <CardDescription>
              Weekly snapshots. No more manual exports.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}
