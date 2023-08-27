import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const supabaseClient = () => createClient(process.env.DB_URL!, process.env.DB_TOKEN!, {
  auth: {
    persistSession: false
  }
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  try {
    const pathname = searchParams.get('pathname');
    const type = searchParams.get('type')?.toLowerCase() || 'view';

    if (!pathname) {
      return NextResponse.json({ message: 'Pathname is required.' }, { status: 400 });
    }

    const { data, error } = await supabaseClient()
      .from('stats')
      .select('count')
      .match({ pathname, type });

    if (error) {
      throw error;
    }

    const count = !data?.length ? 0 : Number(data[0]?.count);

    return NextResponse.json({ count });
  } catch (e) {
    console.error(e);
    NextResponse.json({ message: 'Something went wrong.' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const cookieStore = cookies();
  if (cookieStore.get('notrack')) {
    return NextResponse.json({ message: 'Not tracking.', count: 0 }, { status: 200 });
  }

  const { searchParams } = new URL(req.url);

  try {
    const pathname = searchParams.get('pathname');
    const type = searchParams.get('type')?.toLowerCase() || 'view';

    if (!pathname) {
      return NextResponse.json({ message: 'Pathname is required.' }, { status: 400 });
    }

    let amount = 1;
    try {
      const body = await req.json();

      if (Number.isFinite(body.amount)) {
        amount = body.amount;
      }
    } catch (e) {
      // pass
    }

    const { data, error } = await supabaseClient().rpc('incr_stat', {
      pathname,
      type,
      amount,
    });

    if (error) {
      throw error;
    }

    return NextResponse.json({ count: data });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: 'Something went wrong.' }, { status: 500 });
  }
}
